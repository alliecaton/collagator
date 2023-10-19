import { useEffect, useState, FormEvent } from 'react'
import axios from 'axios'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

import '@/styles/SearchResults.scss'

import { Photo } from '@/types/photos'

type Payload = {
  query?: string
  count: number
}

function SearchResults({ formData }: { formData: Payload }) {
  // const [images, setImages] = useState<Photo[] | null>(fakeData.data)
  const [images, setImages] = useState<Photo[] | null>([])
  const [exports, setExports] = useState<Photo[]>([])

  useEffect(() => {
    async function fetchData() {
      console.log('hit')
      // axios({
      //   method: 'get',
      //   url: process.env.REACT_APP_UNSPLASH_BASE_URL + '/photos/random',
      //   headers: {
      //     Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
      //   },
      //   params: formData,
      // }).then(
      //   (res) => {
      //     setImages(res.data)
      //   },
      //   (error) => {
      //     console.error(error)
      //   }
      // )
    }

    fetchData()
  }, [formData])

  function collectExports(e: any, img: Photo) {
    // If not checked, remove from exports
    if (!e.target.checked) {
      setExports((oldExports) => oldExports.filter((image) => img !== image))
    } else {
      // Otherwise, add to exports
      setExports([...exports, img])
    }
  }

  // Exporting

  const downloadImage = async (e: any) => {
    e.preventDefault()

    let zip = new JSZip()
    let folder = zip.folder('images')

    // Loop through exports and request the download url for each
    // Not ideal, but unsplash does not support bulk downloading
    for (let img of exports) {
      let link = img.links.download_location

      let downloadUrl = ''
      await axios({
        method: 'get',
        url: link,
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`,
        },
      }).then(
        (res) => {
          downloadUrl = res.data.url
        },
        (error) => {
          console.error(error)
        }
      )

      // Fetch the image and parse the response stream as a blob
      const imageBlob = await fetch(downloadUrl).then((response) =>
        response.blob()
      )

      // Create a new file from the blob object
      const imageFile = new File([imageBlob], 'filename.jpg')

      folder?.file(img.slug + '.jpg', imageFile)
    }

    // Create zip with all files
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => saveAs(content, 'files'))
  }

  return (
    <>
      <form onSubmit={(e) => downloadImage(e)}>
        <div className="export">
          <button type="submit" className="export-button button">
            EXPORT {exports.length} PHOTOS
          </button>
        </div>

        <div className="images">
          {images?.map(function (img) {
            return (
              <div key={img.id}>
                <label className="image-label">
                  <input
                    className="image-input"
                    value={img.id}
                    type="checkbox"
                    name={img.id}
                    onClick={(e) => collectExports(e, img)}
                  />
                  <img
                    className="image"
                    src={img.urls.thumb}
                    alt={img.alt_description || img.description}
                  />
                </label>

                <div className="credits">
                  photo by{' '}
                  <a
                    className="credits__link"
                    href={
                      img.user.portfolio_url +
                      '?utm_source=collager&utm_medium=referral'
                    }
                  >
                    {img.user.name}
                  </a>{' '}
                  on{' '}
                  <a
                    className="credits__link"
                    href="https://unsplash.com?utm_source=collager&utm_medium=referral"
                  >
                    Unsplash
                  </a>
                  <div>
                    <a
                      className="credits__link"
                      href={
                        img.urls.raw +
                        '?utm_source=collager&utm_medium=referral'
                      }
                    >
                      source
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </form>
    </>
  )
}

export default SearchResults
