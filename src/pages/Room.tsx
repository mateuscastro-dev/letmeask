import { FormEvent, useState } from 'react'
import { useParams } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  roomKey: string
}

export function Room() {
  const [newQuestion, setNewQuestion] = useState('')

  const { roomKey } = useParams<RoomParams>()

  const { user } = useAuth()
  const { roomName, questions } = useRoom(roomKey)

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
          <h1>{`Sala: ${roomName}`}</h1>
          {questions.length > 0 && <span>{`${questions.length} perguntas`}</span>}
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

        <div className='questions-list'>
          {questions.map((question, index) => (
            <Question key={index} author={question.author} content={question.content} />
          ))}
        </div>
      </main>
    </div>
  )
}
