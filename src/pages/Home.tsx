import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { AuthBanner } from '../components/AuthBanner'
import { Button } from '../components/Button'
import { GoogleButton } from '../components/GoogleButton'

import { database } from '../services/firebase'

import '../styles/auth.scss'

export function Home() {
  const [roomCode, setRoomCode] = useState('')

  const history = useHistory()

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === '') {
      return
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get()

    if (!roomRef.exists()) {
      alert('Room does not exists.')
      return
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id='page-auth'>
      <AuthBanner />

      <main>
        <div className='main-content'>
          <img src={logoImage} alt='letmeask' />

          <GoogleButton />

          <div className='separator'>ou entre em uma sala</div>

          <form onSubmit={handleJoinRoom}>
            <input
              type='text'
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />

            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
