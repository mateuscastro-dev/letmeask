import googleIconImage from '../assets/images/google-icon.svg'

import '../styles/googleButton.scss'

export function GoogleButton() {
  return (
    <button className='google-button'>
      <img src={googleIconImage} alt='Logo do Google' />
      Crie sua sala com o Google
    </button>
  )
}
