import { Box, Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleStartTrivia = (e) => {
    e.preventDefault()
    navigate('/quiz')
  }
  return (
    <>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 24,
        }}
      >
        <h1>Welcome to the Trivia Challenge</h1>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 300,
          }}
        >
          You will be presented with 10 True or False questions
        </Box>
        <Box>Can you score a 100%?</Box>
        <Box mt={12} mb={10}>
          <Button variant='contained' onClick={handleStartTrivia}>
            Begin
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default Home
