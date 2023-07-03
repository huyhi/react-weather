import './headbar.css'
import Button from '@mui/material/Button';

export default function Headbar() {
  const buttonStyle = {
    color: '#263141',
    border: '0.2em solid #263141',
    fontWeight: 600,
    borderRadius: 50,
    '&:hover': {
      border: '0.2em solid #161111',
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
        >
          view on Github
        </Button>
      </div>
    </div>
  )
} 