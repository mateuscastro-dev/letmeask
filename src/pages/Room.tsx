import { useParams } from 'react-router-dom'

export function Room() {
  const { roomKey } = useParams<{ roomKey: string }>()

  return <h1>{`Sala ${roomKey}`}</h1>
}
