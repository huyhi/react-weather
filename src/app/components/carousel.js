import '../styles/carousel.css'
import { randomInt } from '../common'
import Headbar from './headbar'
import SearchInput from './location-input'
import RecentLocations from './recent-locations'
import { useEffect, useState } from 'react'


export default function Carousel() {

  const youtubeId = 'IsEbxgrQoAE'

  const [bgId, setBgId] = useState('')
  useEffect (() => {setBgId(randomInt(5))}, [])

  return (
    <div className='carousel' style={{ backgroundImage: `url('/carousel-bg/${bgId}.jpg')` }}>
      <div className='carousel-container'>

        <Headbar />

        <div className='carousel-content'>
          <div className='carousel-content-main'>
            <SearchInput />
            <RecentLocations />
          </div>
          <div className='carousel-content-side'>
            <iframe src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}
