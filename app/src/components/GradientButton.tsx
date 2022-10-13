import { Button, Div } from 'honorable'

function GradientButton({ gradient = 'gold', fill = false, ...props }) {
  return (
    <Div
      borderRadius="large"
      background={gradient}
      _active={{ transform: 'scale(1.05)' }}
      transition="all 150ms ease"
      cursor="pointer"
      p={0.25}
    >
      <Button
        backgroundColor={fill ? 'transparent' : 'background'}
        borderRadius="large"
        _hover={{ backgroundColor: 'transparent' }}
        _active={{ backgroundColor: 'transparent' }}
        {...props}
      />
    </Div>
  )
}

export default GradientButton
