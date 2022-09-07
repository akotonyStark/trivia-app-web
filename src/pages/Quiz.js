import React from 'react'
import { Box, Button, CircularProgress } from '@mui/material'
import useFetch from '../customHooks/useFetch'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { decode } from 'html-entities'
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
  const { score } = useSelector((state) => state)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [options, setOptions] = useState([])
  const url = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean`

  const { data: questions, isLoading, error } = useFetch(url)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((prev) => prev + 1)
      if (questions[questionIndex].correct_answer === e.target.textContent) {
        dispatch({ type: 'CHANGE_SCORE', payload: score + 1 })
      }
      let obj = {
        question: questions[questionIndex].question,
        seletedOption: e.target.textContent,
        correctAnswer: questions[questionIndex].correct_answer,
      }
      dispatch({ type: 'SAVE_QUESTION', payload: obj })
    } else {
      navigate('/results')
    }
  }

  useEffect(() => {
    if (questions?.length) {
      const question = questions?.[questionIndex]
      let answers = [...question.incorrect_answers, question.correct_answer]
      //shuffle answers
      answers.sort(() => Math.random() - 0.5)
      setOptions(answers)
    } else {
    }
  }, [questions, questionIndex])

  if (isLoading) {
    return (
      <Box mt={10} style={{ minHeight: 500 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box>
        {error ? (
          <h3 style={{ color: 'darkred' }}>{error}</h3>
        ) : (
          <h1>{questions[questionIndex]?.category}</h1>
        )}
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {questions.length ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              width: 400,
              height: 400,
              border: '1px solid black',
            }}
          >
            <Box>
              <h2>Question {questionIndex + 1}</h2>
            </Box>
            <Box mt={2}>{decode(questions[questionIndex]?.question)}</Box>
            {options?.map((ans, i) => {
              return (
                <Box mt={3} key={i}>
                  <Button fullWidth variant={'outlined'} onClick={handleClick}>
                    {decode(ans)}
                  </Button>
                </Box>
              )
            })}
          </Box>
        ) : null}
      </Box>

      <Box mt={4}>
        <h2>
          {questionIndex + 1} of {questions.length}
        </h2>
      </Box>
    </>
  )
}

export default Quiz
