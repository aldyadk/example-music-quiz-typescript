import React from 'react'
import { Wrapper } from '../App.styles'

export interface AnswerObject {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}

interface Props {
  question: string
  answers: string[]
  cb: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  userAnswer: AnswerObject | undefined
  questionNumber: number
  totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({ question, answers, cb, questionNumber, totalQuestions, userAnswer, children }) => (
  <Wrapper mb>
    <p className="number">
      Question: {questionNumber} / {totalQuestions}
    </p>
    <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {answers.map((v, idx) => (
        <div key={idx}>
          <button className={!!userAnswer ? 'disabled' : ''} disabled={!!userAnswer} onClick={cb} value={v}>
            <span dangerouslySetInnerHTML={{ __html: v }} />
          </button>
        </div>
      ))}
    </div>
  </Wrapper>
)

export default QuestionCard