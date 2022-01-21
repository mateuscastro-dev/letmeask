import { BrowserRouter, Route } from 'react-router-dom'

import { Auth } from './pages/Auth'
import { NewRoom } from './pages/NewRoom'

export function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Auth} exact />
      <Route path='/rooms/new' component={NewRoom} />
    </BrowserRouter>
  )
}
