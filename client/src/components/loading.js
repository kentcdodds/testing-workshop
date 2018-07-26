import React from 'react'
import styled, {keyframes} from 'react-emotion'

const bounce = keyframes({
  '0%': {
    color: 'var(--black)',
    boxShadow: 'var(--shadowHover)',
  },
  '100%': {
    color: 'var(--green)',
    boxShadow: 'var(--shadow)',
  },
})

const loadingAnimation = {
  animation: `${bounce} 0.7s infinite ease-in-out alternate`,
}

const LoadingContainer = styled('span')(
  {
    position: 'fixed',
    left: '50%',
    top: '50%',
    background: 'white',
    color: 'var(--green)',
    boxShadow: 'var(--shadow)',
    padding: '20px 30px',
    fontSize: '20px',
    fontWeight: 'bold',
    borderRadius: '20px',
    marginLeft: '-70px',
    marginTop: '-32px',
  },
  loadingAnimation,
)

function Loading() {
  return <LoadingContainer>Loading</LoadingContainer>
}

export default Loading
