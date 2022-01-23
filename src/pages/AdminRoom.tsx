import { useParams } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'
import deleteImage from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { RoomCode } from '../components/RoomCode'

import { useRoom } from '../hooks/useRoom'

import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  roomKey: string
}

export function AdminRoom() {
  const { roomKey } = useParams<RoomParams>()
  const { roomName, questions } = useRoom(roomKey)

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomKey}/questions/${questionId}`).remove()
    }
  }

  return (
    <div id='page-room'>
      <header>
        <div className='content'>
          <img src={logoImage} alt='letmeask' />

          <div>
            <RoomCode code={roomKey} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>{`Sala: ${roomName}`}</h1>
          {questions.length > 0 && <span>{`${questions.length} perguntas`}</span>}
        </div>

        <div className='questions-list'>
          {questions.map((question, index) => (
            <Question key={index} author={question.author} content={question.content}>
              <button type='button' onClick={() => handleDeleteQuestion(question.id)}>
                <img src={deleteImage} alt='Remover a pergunta' />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  )
}
