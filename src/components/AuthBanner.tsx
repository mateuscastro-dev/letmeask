import illustrationImage from '../assets/images/illustration.svg'

import '../styles/authBanner.scss'

export function AuthBanner() {
  return (
    <aside className='auth-banner'>
      <img src={illustrationImage} alt='Ilustração simbolizando perguntas e respostsas' />

      <strong>Crie salas de Q&amp;A ao vivo </strong>
      <p>Tire as dúvidas da sua audiência em tempo real</p>
    </aside>
  )
}
