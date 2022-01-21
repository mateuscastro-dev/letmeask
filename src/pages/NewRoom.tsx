import { Link } from 'react-router-dom'

import logoImage from '../assets/images/logo.svg'

import { AuthBanner } from '../components/AuthBanner'
import { Button } from '../components/Button'

import '../styles/auth.scss'

export function NewRoom() {
  return (
    <div id='page-auth'>
      <AuthBanner />

      <main>
        <div className='main-content'>
          <img src={logoImage} alt='letmeask' />

          <h2>Criar uma nova sala</h2>

          <form>
            <input type='text' placeholder='Nome da sala' />

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
