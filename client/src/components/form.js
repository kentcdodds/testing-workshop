import React from 'react'
import glamorous from 'glamorous'
import {Button} from './inputs'

const labelSpace = 100
const gridGap = 16

const StyledForm = glamorous.form({
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

const FieldContainer = glamorous.div({
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
    <glamorous.Div
      css={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
    >
      <StyledForm {...props}>
        <FieldContainer>{children}</FieldContainer>
        <Button type="submit">Submit</Button>
      </StyledForm>
    </glamorous.Div>
  )
}

export default Form
