import { Div, H1, H2, H3, H4, P } from 'honorable'

function DesignSystem() {
  return (
    <>
      <H1>
        Design System
      </H1>
      <H2 mt={2}>
        Colors
      </H2>
      <Colors />
      <H2 mt={2}>
        Typography
      </H2>
      <Typography />
    </>
  )
}

function Colors() {
  const colors = [
    'primary',
    'gold.300',
    'gold.400',
    'gold.500',
    'gold.600',
    'gold.700',
  ]

  return (
    <Div
      xflex="x11"
      gap={1}
      mt={1}
    >
      {colors.map(color => (
        <Div
          key={color}
          xflex="y2"
        >
          <Div
            borderRadius="medium"
            width={64}
            height={64}
            backgroundColor={color}
          />
          <P mt={0.5}>{color}</P>
        </Div>
      ))}
    </Div>
  )
}

function Typography() {
  return (
    <>
      <H1 mt={1}>Title H1 Lorem Ipsum</H1>
      <H2 mt={1}>Title H2 Lorem Ipsum</H2>
      <H3 mt={1}>Title H3 Lorem Ipsum</H3>
      <H4 mt={1}>Title H4 Lorem Ipsum</H4>
      <P mt={1}>Paragraph P default</P>
    </>
  )
}
export default DesignSystem
