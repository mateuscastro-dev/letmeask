import { useEffect, useState } from 'react'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type QuestionType = {
  id: string
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  likeCount: number
  likeId: string | undefined
}

type FirebaseQuestion = {
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
  likes: Record<
    string,
    {
      authorId: string
    }
  >
}

type FirebaseQuestions = Record<string, FirebaseQuestion>

export function useRoom(roomKey: string) {
  const [roomName, setRoomName] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>([])

  const { user } = useAuth()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomKey}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(
            ([key, value]) => value.authorId === user?.id,
          )?.[0],
        }
      })

      setRoomName(databaseRoom.name)
      setQuestions(parsedQuestions)
    })

    return () => {
      roomRef.off('value')
    }
  }, [roomKey, user?.id])

  return { roomName, questions }
}
