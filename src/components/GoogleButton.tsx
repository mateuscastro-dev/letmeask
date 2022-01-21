import { useHistory } from 'react-router-dom'

import googleIconImage from '../assets/images/google-icon.svg'
import { auth, firebase } from '../services/firebase'

import '../styles/googleButton.scss'

export function GoogleButton() {
  const history = useHistory()

  function handleCreateRoom() {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then(response => {
      console.log(response)
      history.push('/rooms/new')
    })
  }

  return (
    <button className='google-button' onClick={handleCreateRoom}>
      <img src={googleIconImage} alt='Logo do Google' />
      Crie sua sala com o Google
    </button>
  )
}
