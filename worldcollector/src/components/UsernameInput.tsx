import { type Dispatch, type SetStateAction, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { collection, getCountFromServer, query, where } from 'firebase/firestore'

import { db } from '~firebase'

import useThrottledEffect from '~hooks/useThrottledEffect'

import TextInput from './TextInput'

import theme from '~theme'

type UsernameInputProps = {
  value: string
  setValue: Dispatch<SetStateAction<string>>
  isValid: boolean
  setIsValid: Dispatch<SetStateAction<boolean>>
}

function UsernameInput({ value, setValue, isValid, setIsValid }: UsernameInputProps) {
  const [touched, setTouched] = useState(false)

  const q = useMemo(() => query(collection(db, 'users'), where('name', '==', value)), [value])

  useThrottledEffect(() => {
    if (!value) return

    getCountFromServer(q).then(snapshot => {
      setIsValid(snapshot.data().count === 0)
      setTouched(true)
    })
  }, 200, [value, q, setIsValid])

  return (
    <>
      <View style={styles.row}>
        <TextInput
          autoCorrect={false}
          placeholder="eg: CoolCollector, Myself007, ..."
          value={value}
          onChangeText={setValue}
          style={styles.input}
        />
        {(!touched || !value.length) && (
          <View style={styles.iconPlaceholder} />
        )}
        {touched && !!value.length && isValid && (
          <MaterialIcons
            name="check"
            size={24}
            color={theme.colors.green[500]}
          />
        )}
        {touched && !!value.length && !isValid && (
          <MaterialIcons
            name="close"
            size={24}
            color={theme.colors.red[500]}
          />
        )}
      </View>
      {!isValid && touched && (
        <Text style={styles.textError}>
          This username is already taken
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
  },
  input: {
    width: 'auto',
    flexGrow: 1,
  },
  textError: {
    color: theme.colors.red[500],
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  iconPlaceholder: {
    width: 24,
  },
})

export default UsernameInput
