import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { AuthBanner } from '../components/AuthBanner'
import { Button } from '../components/Button'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/auth.scss'

export function NewRoom() {
  const [newRoomName, setNewRoomName] = useState('')

  const { user } = useAuth()
  const history = useHistory()

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault()

    if (newRoomName.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      name: newRoomName,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id='page-auth'>
      <AuthBanner />

      <main>
        <div className='main-content'>
          <img src={logoImage} alt='letmeask' />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input
              type='text'
              placeholder='Nome da sala'
              onChange={event => setNewRoomName(event.target.value)}
              value={newRoomName}
            />

            <Button type='submit'>Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to='/'>Clique aqui!</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
