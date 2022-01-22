import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room'
import { AdminRoom } from './pages/AdminRoom'

export function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path='/' component={Home} exact />

          <Route path='/rooms/new' component={NewRoom} />
          <Route path='/rooms/:roomKey' component={Room} />

          <Route path='/admin/rooms/:roomKey' component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
