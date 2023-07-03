import './carousel.css'
import Headbar from './headbar'
import SearchInput from './location-input'
import RecentLocations from './recent-locations'


export default function Carousel() {

  let youtubeId = 'IsEbxgrQoAE'

  return (
    <div className='carousel'>
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
