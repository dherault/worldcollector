import { Button, Div, H1, H3 } from 'honorable'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import LayoutContainer from '../components/LayoutContainer'

const STEP_TO_COMPONENT = [
  CollectibleTutorialRules,
  CollectibleTutorialVerification,
  CollectibleTutorialEnd,
]

function CollectibleTutorial() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const Component = STEP_TO_COMPONENT[step]

  const handlePrevious = useCallback(() => {
    if (step > 0) {
      setStep(step - 1)
    }
  }, [step])

  const handleNext = useCallback(() => {
    if (step < STEP_TO_COMPONENT.length - 1) {
      setStep(step + 1)
    }
    else {
      navigate('/collect')
    }
  }, [step, navigate])

  return (
    <LayoutContainer>
      <Div
        xflex="y2"
        width={512 + 128}
        height="75vh"
        backgroundColor="background-light"
        borderRadius="large"
        mx="auto"
        p={2}
      >
        <Component />
        <Div flexGrow={1} />
        <Div
          xflex="x6"
          mt={4}
          width="100%"
        >
          {step > 0 && (
            <Button
              onClick={handlePrevious}
              mr={1}
            >
              Back
            </Button>
          )}
          <Button
            gradient="rainbow"
            onClick={handleNext}
          >
            Continue
          </Button>
        </Div>
      </Div>
    </LayoutContainer>
  )
}

function CollectibleTutorialRules() {
  return (
    <>
      <H1 textAlign="center">
        Welcome to the<br />World Collector tutorial!
      </H1>
      <Div
        mt={2}
        textAlign="center"
      >
        This tutorial will guide you through the process of<br />collecting your first collectible.
      </Div>
      <H3 mt={2}>
        Golden rule
      </H3>
      <Div
        mt={1}
        fontStyle="italic"
        textAlign="center"
      >
        You can collect anything but living beings.
      </Div>
      <H3 mt={2}>
        Unicity rule
      </H3>
      <Div
        mt={1}
        fontStyle="italic"
        textAlign="center"
      >
        You cannot collect something that has already been collected.
      </Div>
      <H3 mt={2}>
        Ownership rule
      </H3>
      <Div
        mt={1}
        fontStyle="italic"
        textAlign="center"
      >
        If you collect something that does not belong to you, it might be removed from you if claimed by its rightful owner.
      </Div>
    </>
  )
}

function CollectibleTutorialVerification() {
  return (
    <>
      <H1>
        Verification process
      </H1>
      <Div
        mt={2}
        textAlign="center"
      >
        Once collected, a collectible will be verified by our team.<br />This process can take up to 72 hours.<br />Usally takes less than 24 hours.
      </Div>
      <Div
        mt={2}
        textAlign="center"
      >
        Already collected collectibles will be removed from your account.
      </Div>
      <Div
        mt={2}
        textAlign="center"
      >
        Once verified, a collectible can be transfered to another onwer.
      </Div>
    </>
  )
}

function CollectibleTutorialEnd() {
  return (
    <>
      <H1>
        Have fun collecting!
      </H1>
      <Div mt={2}>
        And remember to respect others and the rules.
      </Div>
    </>
  )
}

export default CollectibleTutorial
