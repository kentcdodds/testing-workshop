import styled from 'react-emotion'

const Input = styled('input')({
  background: 'white',
  height: 50,
  border: 'none',
  borderRadius: 10,
  boxShadow: 'var(--shadow)',
  borderBottom: 5,
  width: '100%',
  minWidth: 150,
  display: 'block',
  paddingLeft: 10,

  '::placeholder': {
    opacity: 0.5,
  },
})

const TextArea = styled('textarea')({
  background: 'white',
  border: 'none',
  height: 200,
  borderRadius: 10,
  boxShadow: 'var(--shadow)',
  borderBottom: 5,
  width: '100%',
  minWidth: 150,
  display: 'block',
  margin: '0 auto 10px auto',
  paddingTop: 10,
  paddingLeft: 10,

  '::placeholder': {
    opacity: 0.5,
  },
})

const Button = styled('button')({
  fontSize: 13,
  fontFamily: 'Raleway,sans-serif',
  background: 'var(--green)',
  padding: '10px 20px',
  display: 'block',
  marginLeft: 'auto',
  color: 'white',
  border: 'none',
  borderRadius: 10,
  boxShadow: 'var(--shadow)',
  cursor: 'pointer',
  transition: '0.5s',

  ':hover': {
    boxShadow: 'var(--shadowHover)',
  },
})

export {Input, TextArea, Button}
