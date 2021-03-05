import { shuffleArr } from '../utils/util'

export interface Question {
  category: string
  correct_answer: string
  difficulty: string
  incorrect_answers: string[]
  question: string
  type: string
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=12&difficulty=${difficulty}&type=multiple`
  const data = await (await fetch(endpoint)).json()
  return data.results.map((question:Question): QuestionState => (
    {
      ...question,
      answers: shuffleArr([question.correct_answer, ...question.incorrect_answers ]),
    }
  ))
}