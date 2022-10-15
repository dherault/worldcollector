import { Button } from 'honorable'

function GradientButton({ gradient = 'gold', ...props }) {
  return (
    <Button
      backgroundColor="transparent"
      _hover={{ backgroundColor: 'transparent', transform: 'scale(1.04)' }}
      _active={{ backgroundColor: 'transparent', transform: 'scale(1)' }}
      background={gradient}
      transition="all 150ms ease"
      borderRadius="medium"
      {...props}
    />
  )
}

export default GradientButton
