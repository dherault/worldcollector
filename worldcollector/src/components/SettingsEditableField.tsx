import { useCallback, useContext, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { doc, updateDoc } from 'firebase/firestore'
import { updatePassword } from 'firebase/auth/react-native'

import type { User } from '~types'

import { authenticationErrors } from '~constants'

import { authentication, db } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import Label from '~components/Label'
import ButtonIcon from '~components/ButtonIcon'
import TextInput from '~components/TextInput'

import theme from '~theme'

type SettingsEditableFieldProps = {
  fieldKey: keyof User | 'password'
  fieldLabel: string
}

function SettingsEditableField({ fieldKey, fieldLabel }: SettingsEditableFieldProps) {
  const { viewer, setViewer } = useContext(ViewerContext)

  const [edited, setEdited] = useState(false)
  const [value, setValue] = useState(viewer[fieldKey] ?? '')
  const [errorCode, setErrorCode] = useState('')
  const [success, setSuccess] = useState(false)

  const error = authenticationErrors[errorCode as keyof typeof authenticationErrors] ?? (errorCode ? authenticationErrors.default : null)

  const handlePasswordSubmit = useCallback(() => {
    setValue('')

    updatePassword(authentication.currentUser, value)
    .then(() => {
      setSuccess(true)
    })
    .catch(error => {
      setErrorCode(error.code)
    })
  }, [value])

  const handleSubmit = useCallback(() => {
    if (!value.trim()) return

    setSuccess(false)
    setErrorCode(null)
    setEdited(false)

    if (fieldKey === 'password') return handlePasswordSubmit()

    setViewer(viewer => ({
      ...viewer,
      [fieldKey]: value,
    }))

    updateDoc(doc(db, 'users', viewer.id), {
      [fieldKey]: value,
    })
    .then(() => {
      setSuccess(true)
    })
    .catch(error => {
      setErrorCode(error.code)
    })
  }, [
    fieldKey,
    value,
    viewer.id,
    handlePasswordSubmit,
    setViewer,
  ])

  return (
    <>
      <Label>
        {fieldLabel}
      </Label>
      <View style={styles.row}>
        {!edited && (
          <>
            <Text style={styles.label}>
              {fieldKey === 'password' ? '••••••••' : value}
            </Text>
            <View style={styles.grow} />
            <ButtonIcon onPress={() => setEdited(true)}>
              <MaterialIcons
                name="edit"
                size={24}
                color="black"
              />
            </ButtonIcon>
          </>
        )}
        {edited && (
          <>
            <TextInput
              value={value}
              onChangeText={setValue}
              secureTextEntry={fieldKey === 'password'}
              onSubmitEditing={handleSubmit}
              style={styles.input}
            />
            <ButtonIcon
              onPress={handleSubmit}
            >
              <MaterialIcons
                name="check"
                size={24}
                color={theme.colors.green[500]}
              />
            </ButtonIcon>
            <ButtonIcon
              onPress={() => {
                setEdited(false)
                setValue(viewer[fieldKey])
              }}
            >
              <MaterialIcons
                name="close"
                size={24}
                color={theme.colors.red[500]}
              />
            </ButtonIcon>
          </>
        )}
      </View>
      {success && (
        <Text style={styles.success}>
          {fieldLabel}
          {' '}
          updated!
        </Text>
      )}
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    height: 32,
  },
  input: {
    width: 'auto',
    flexGrow: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
  success: {
    color: theme.colors.green[500],
  },
  error: {
    color: theme.colors.red[500],
  },
  grow: {
    flexGrow: 1,
  },
})

export default SettingsEditableField
