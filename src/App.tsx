import React, { useState } from 'react';
import Marquee from 'react-double-marquee';

import { fetchQuestions } from './api/API'
import { Difficulty, QuestionState } from './api/API'

import { GlobalStyle, Wrapper } from './App.styles'

import QuestionCard, { AnswerObject } from './components/QuestionCard'

const TOTAL_QUESTIONS = 10

const App = () => {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuestions(TOTAL_QUESTIONS,Difficulty.HARD))

  const startQuiz = async () => {
    setGameOver(false)
    setLoading(true)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    const questions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.HARD)
    setQuestions(questions)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      console.log(answer)
      const isCorrect = questions[number].correct_answer === answer
      if (isCorrect) {
        setScore(prev => prev + 1)
      }
      const answerObj: AnswerObject = {
        answer,
        correct: isCorrect,
        question: questions[number].question,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObj])
    }
  }
  const nextQuestion = () => {
    if (number < TOTAL_QUESTIONS) {
      setNumber(prev => prev + 1)
    } else {
      setGameOver(true)
    }
  }
  const handleFooterClick = () => {
    const newWindow = window.open()
    if(newWindow){
      newWindow.location.href = 'https://github.com/aldyadk/example-music-quiz-typescript'
    }
  }
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <Wrapper>
          <h1 className="green-border">Music Quiz</h1>
          {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
            <button className='start' onClick={startQuiz}>{!questions.length ? 'start' : 're-start'}</button>
          )}
          {!gameOver && <p className="score">Score: {score}</p>}
          {loading && <p>Loading...</p>}
          {!loading && !gameOver && (
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              cb={checkAnswer}
            />
          )}
          {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 && (
            <button className='next' onClick={nextQuestion}>next</button>
          )}
        </Wrapper>
        <div
          style={{
            width: '100%',
            whiteSpace: 'nowrap',
            position: 'fixed',
            bottom: 10
          }}
        >
          <Marquee direction='left' scrollWhen='always' delay={0}>
            <span style={{cursor: 'pointer'}} onClick={handleFooterClick}>
              Aldy ADK Andika - 2021 - node - react - typescript - create-react-app - styled-components -  react-double-marquee - Aldy ADK Andika - 2021 - node - react - typescript - create-react-app - styled-components -  react-double-marquee -
            </span>
          </Marquee>
        </div>
      </div>
    </>
  );
}

export default App;
