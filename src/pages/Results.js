import React from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { decode } from 'html-entities'

const Results = () => {
  const { score, questions } = useSelector((state) => state)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleRestart = () => {
    dispatch({ type: 'CHANGE_SCORE', payload: 0 })
    dispatch({ type: 'PLAY_AGAIN' })
    navigate('/')
  }
  return (
    <>
      <Box>
        <h1>You scored {score}/10</h1>
      </Box>

      <Box style={{ maxHeight: 500, overflow: 'auto' }}>
        {questions?.map((item, i) => (
          <Box key={i} style={{ border: '1px solid #e3e3e3' }}>
            <h4>{decode(item?.question)}</h4>
            <p>Your ans: {item?.seletedOption}</p>
            <p>Right ans: {item?.correctAnswer}</p>
          </Box>
        ))}
      </Box>

      <Box mt={4} mb={4}>
        <Button variant='contained' onClick={handleRestart}>
          Play Again ?
        </Button>
      </Box>
    </>
  )
}

export default Results
