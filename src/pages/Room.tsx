import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  roomKey: string
}

export function Room() {
  const [newQuestion, setNewQuestion] = useState('')

  const { user } = useAuth()
  const { roomKey } = useParams<RoomParams>()

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault()

    if (newQuestion.trim() === '') {
      return
    }

    if (!user) {
      alert('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomKey}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImage} alt='letmeask' />
          <RoomCode code={roomKey} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Aula de React JS</h1>
          <span>10 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você quer perguntar?'
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}

            <Button type='submit' disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
