import React from 'react'
import {css as emoCSS} from 'emotion'
import styled from 'react-emotion'

const css = (...args) => ({className: emoCSS(...args)})

const labelSpace = 100
const gridGap = 16

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  minWidth: 200,
  maxWidth: 400,
  marginLeft: -(labelSpace + gridGap),

  '@media only screen and (max-width: 819px)': {
    marginLeft: 0,
    width: '90%',
  },
})

const FieldContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: `${labelSpace}px 1fr`,
  gridGap,
  fontSize: 18,
  alignItems: 'center',
  marginTop: 30,
  marginBottom: 30,
  width: '100%',
})

function Form({children, ...props}) {
  return (
    <div
      {...css({display: 'flex', flexDirection: 'column', alignItems: 'center'})}
    >
      <StyledForm {...props}>
        <FieldContainer>{children}</FieldContainer>
      </StyledForm>
    </div>
  )
}

export default Form
