import glamorous from 'glamorous'

const HiddenLabel = glamorous.label({
  // copied from bootstrap's sr-only css
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  overflow: 'hidden',
  clip: 'rect(0,0,0,0)',
  whiteSpace: 'nowrap',
  WebkitClipPath: 'inset(50%)',
  clipPath: 'inset(50%)',
  border: '0',
})

export {HiddenLabel}
