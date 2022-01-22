import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'

export function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/rooms/new' component={NewRoom} exact />
          <Route path='/rooms/:roomKey' component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
