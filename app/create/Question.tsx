import { Answer } from '@/app/create/Answer'
import React from 'react'

export const Question = ({number}) => {
  return (
    <div>
      Вопрос № {number}
      <div>
        <Answer />
      </div>
    </div>
  )
}
