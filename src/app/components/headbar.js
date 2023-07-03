import './headbar.css'
import Button from '@mui/material/Button';

export default function Headbar() {
  const buttonStyle = {
    // color: '#263141',
    borderWidth: '3px',
    // border: '0.2em solid #263141',
    fontWeight: 600,
    borderRadius: 50,
    '&:hover': {
      borderWidth: '3px',
      // border: '0.2em solid #161111',
    }
  }

  return (
    <div className='headbar'>
      <div className='logo'>
      </div>
      <div className='login'>
        <Button 
          variant="outlined"
          sx = {buttonStyle}
          onClick={() => { window.location.href = 'https://github.com/huyhi/react-weather'}}
        >
          view on Github
        </Button>
      </div>
    </div>
  )
} 