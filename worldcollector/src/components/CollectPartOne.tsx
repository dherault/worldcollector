import { type Dispatch, type SetStateAction } from 'react'
import { StyleSheet, Text } from 'react-native'

import Heading from '~components/Heading'
import TextInput from '~components/TextInput'

import theme from '~theme'

type CollectPartOneProps = {
  name: string
  setName: Dispatch<SetStateAction<string>>
  nameError: string
  setNameError: Dispatch<SetStateAction<string>>
}

function CollectPartOne({ name, setName, nameError, setNameError }: CollectPartOneProps) {
  return (
    <>
      <Heading style={styles.headingRed}>
        1
      </Heading>
      <Heading>
        Name your collectible
      </Heading>
      <Text style={styles.textInfo}>
        It must be unique, make sure to check its unicity using the search function first.
      </Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="The Statue of Liberty"
        style={styles.input}
      />
    </>
  )
}

const styles = StyleSheet.create({
  headingRed: {
    marginTop: 32,
    color: theme.colors.red[500],
  },
  textInfo: {
    marginVertical: 8,
  },
  input: {
    marginTop: 8,
    fontSize: 16,
    paddingVertical: 12,
  },
})

export default CollectPartOne
