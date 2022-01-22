import { useParams } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'

type RoomParams = {
  roomKey: string
}

export function Room() {
  const { roomKey } = useParams<RoomParams>()

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

        <form>
          <textarea placeholder='O que você quer perguntar?' />

          <div className='form-footer'>
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
