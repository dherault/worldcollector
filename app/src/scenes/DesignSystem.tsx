import { Button, Div, H1, H2, H3, H4, P } from 'honorable'

function DesignSystem() {
  return (
    <Div pb={12}>
      <H1>
        Design System
      </H1>
      <H2 mt={4}>
        Colors
      </H2>
      <Colors />
      <H2 mt={4}>
        Typography
      </H2>
      <Typography />
      <H2 mt={4}>
        Buttons
      </H2>
      <Buttons />
    </Div>
  )
}

function Colors() {
  const colors = [
    [
      'primary',
    ],
    [
      'blue.50',
      'blue.100',
      'blue.200',
      'blue.300',
      'blue.400',
      'blue.500',
      'blue.600',
      'blue.700',
      'blue.800',
      'blue.900',
    ],
    [
      'green.50',
      'green.100',
      'green.200',
      'green.300',
      'green.400',
      'green.500',
      'green.600',
      'green.700',
      'green.800',
      'green.900',
    ],
    [
      'yellow.50',
      'yellow.100',
      'yellow.200',
      'yellow.300',
      'yellow.400',
      'yellow.500',
      'yellow.600',
      'yellow.700',
      'yellow.800',
      'yellow.900',
    ],
    [
      'red.50',
      'red.100',
      'red.200',
      'red.300',
      'red.400',
      'red.500',
      'red.600',
      'red.700',
      'red.800',
      'red.900',
    ],
    [
      'pink.50',
      'pink.100',
      'pink.200',
      'pink.300',
      'pink.400',
      'pink.500',
      'pink.600',
      'pink.700',
      'pink.800',
      'pink.900',
    ],
    [
      'grey.50',
      'grey.100',
      'grey.200',
      'grey.300',
      'grey.400',
      'grey.500',
      'grey.600',
      'grey.700',
      'grey.800',
      'grey.900',
    ],
    [
      'gold',
      'rainbow',
    ],
  ]

  return (
    <Div>
      {colors.map((colorBatch, i) => (
        <Div
          key={i}
          xflex="x4"
          gap={1}
          mt={1}
        >
          {colorBatch.map(color => (
            <Div
              key={color}
              xflex="y2"
            >
              <Div
                borderRadius="medium"
                width={96}
                height={96}
                background={color}
              />
              <P mt={0.5}>{color}</P>
            </Div>
          ))}
        </Div>
      ))}
    </Div>
  )
}

function Typography() {
  return (
    <>
      <H1 mt={1}>Title H1 Lorem Ipsum</H1>
      <H2 mt={2}>Title H2 Lorem Ipsum</H2>
      <H3 mt={2}>Title H3 Lorem Ipsum</H3>
      <H4 mt={2}>Title H4 Lorem Ipsum</H4>
      <P mt={2}>Paragraph P default</P>
    </>
  )
}

function Buttons() {
  return (
    <Div
      xflex="y1"
      gap={1}
      mt={1}
    >
      <Button gradient="gold">Gold</Button>
      <Button gradient="rainbow">Rainbow</Button>
    </Div>
  )
}

export default DesignSystem
