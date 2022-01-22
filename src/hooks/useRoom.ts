import { useEffect, useState } from 'react'

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
}

type FirebaseQuestion = {
  content: string
  author: {
    name: string
    avatar: string
  }
  isHighlighted: boolean
  isAnswered: boolean
}

type FirebaseQuestions = Record<string, FirebaseQuestion>

export function useRoom(roomKey: string) {
  const [roomName, setRoomName] = useState('')
  const [questions, setQuestions] = useState<QuestionType[]>([])

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
        }
      })

      setRoomName(databaseRoom.name)
      setQuestions(parsedQuestions)
    })
  }, [roomKey])

  return { roomName, questions }
}
