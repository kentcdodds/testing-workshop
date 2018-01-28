import React from 'react'
import glamorous from 'glamorous'

const InputStyled = glamorous.input({
    background: 'white',
    height: 50,
    border: 'none',
    borderRadius: 10,
    boxShadow: 'var(--shadow)',
    borderBottom: 5,
    width: '30%',
    display: 'block',
    margin: '0 auto 10px auto',
    paddingLeft: 10,
    '::placeholder': {
      opacity: 0.5,
    },
    '@media only screen and (max-width: 744px)': {
      width: '70%',
    },
})

export const Input = ({...props}) => 
    <InputStyled {...props} />

const TextAreaStyled = glamorous.textarea({
    background: 'white',
    border: 'none',
    height:200,
    borderRadius: 10,
    boxShadow: 'var(--shadow)',
    borderBottom: 5,
    width: '30%',
    display: 'block',
    margin: '0 auto 10px auto',
    paddingTop: 10,
    paddingLeft: 10,
    '::placeholder': {
        opacity: 0.5,
    },
    '@media only screen and (max-width: 744px)': {
        width: '70%',
    },
})
    
export const TextArea = ({...props}) => 
    <TextAreaStyled {...props} />
    
const ButtonStyled = glamorous.input({
    background: 'var(--green)',
    padding: '10px 20px',
    display: 'block',
    margin: 'auto',
    color: 'white',
    borderRadius: 10,
    boxShadow: 'var(--shadow)',
    cursor: 'pointer',
    transition: '0.5s',
    ':hover': {
        boxShadow: 'var(--shadowHover)',
    },
})

export const Button = ({...props}) => 
    <ButtonStyled {...props} />