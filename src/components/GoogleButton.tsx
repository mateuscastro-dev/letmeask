import { useHistory } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import googleIconImage from '../assets/images/google-icon.svg'

import '../styles/googleButton.scss'

export function GoogleButton() {
  const history = useHistory()
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle()
    }

    history.push('/rooms/new')
  }

  return (
    <button className='google-button' onClick={handleCreateRoom}>
      <img src={googleIconImage} alt='Logo do Google' />
      Crie sua sala com o Google
    </button>
  )
}
