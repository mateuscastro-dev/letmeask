import logoImage from '../assets/images/logo.svg'

import { AuthBanner } from '../components/AuthBanner'
import { Button } from '../components/Button'
import { GoogleButton } from '../components/GoogleButton'

import '../styles/auth.scss'

export function Home() {
  return (
    <div id='page-auth'>
      <AuthBanner />

      <main>
        <div className='main-content'>
          <img src={logoImage} alt='letmeask' />

          <GoogleButton />

          <div className='separator'>ou entre em uma sala</div>

          <form>
            <input type='text' placeholder='Digite o código da sala' />

            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
