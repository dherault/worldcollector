import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Flex, Form, Icon, Input, P } from 'honorable'
import { doc, getDoc, setDoc } from 'firebase/firestore'
// import { httpsCallable } from 'firebase/functions'
import { createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect } from 'firebase/auth'
import { MdEmail, MdPerson } from 'react-icons/md'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'

import { authentication, db, googleProvider } from '../firebase'
import { UserType } from '../types'

import GoogleIcon from '../icons/GoogleIcon'

import FullScreenSpinner from '../components/FullScreenSpinner'

const redirectionLocalStorageKey = 'worldcollector:provider-redirect'

function Authentication({ isSignUp }: any) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [pseudonyme, setPseudonyme] = useState('')
  const [error, setError] = useState('')
  const [loadingProvider, setLoadingProvider] = useState(true)
  const [loadingEmail, setLoadingEmail] = useState(false)

  const inOrUp = isSignUp ? 'up' : 'in'

  useEffect(() => {
    if (localStorage.getItem(redirectionLocalStorageKey) === '1') {
      setLoadingProvider(true)

      localStorage.removeItem(redirectionLocalStorageKey)
    }
    else {
      setLoadingProvider(false)
    }
  }, [])

  useEffect(() => {
    getRedirectResult(authentication)
    .then(async result => {
      console.log('result', result)

      if (!result) {
        setLoadingProvider(false)

        return
      }

      const existingUserDocument = await getDoc(doc(db, 'users', result.user.uid))
      const existingUser = existingUserDocument.data() as UserType

      const userMetadata: UserType = {
        id: result.user.uid,
        pseudonyme: result.user.displayName || existingUser?.pseudonyme || 'A user',
        email: result.user.email || existingUser?.email || '',
        imageUrl: result.user.photoURL || existingUser?.imageUrl || '',
        createdAt: existingUser?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      await setDoc(doc(db, 'users', userMetadata.id), userMetadata, { merge: true })

      navigate(`/u/${result.user.uid}`)
    })
    .catch(error => {
      console.error(error)
      setLoadingProvider(false)
    })
  }, [navigate])

  function handleGoogleClick() {
    localStorage.setItem(redirectionLocalStorageKey, '1')

    signInWithRedirect(authentication, googleProvider)
  }

  // function handleFacebookClick() {
  //   localStorage.setItem(redirectionLocalStorageKey, '1')

  //   signInWithRedirect(authentication, facebookProvider)
  // }

  // function handleAppleClick() {
  //   localStorage.setItem(redirectionLocalStorageKey, '1')

  //   signInWithRedirect(authentication, appleProvider)
  // }

  // function handleMicrosoftClick() {
  //   localStorage.setItem(redirectionLocalStorageKey, '1')

  //   signInWithRedirect(authentication, microsoftProvider)
  // }

  // const handleSendWelcomeEmail = useCallback(() => {
  //   const sendWelcomeEmail = httpsCallable(functions, 'sendWelcomeEmail')

  //   sendWelcomeEmail({
  //     to: email,
  //     worldsUrl: 'https://wherespace.app/worlds',
  //   })
  //   .then(() => {
  //     navigate('/worlds')
  //   })
  //   .catch(error => {
  //     console.log('error', error)
  //     setError(error.message)
  //   })
  // }, [email, navigate])

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault()

    if (isSignUp && !pseudonyme) return setError('Please enter a name.')
    if (!email) return setError('Please enter an email.')
    if (!password) return setError('Please enter a password.')

    const normalizedEmail = email.trim().toLowerCase()

    setLoadingEmail(true)

    ;(
      isSignUp
        ? createUserWithEmailAndPassword(authentication, normalizedEmail, password)
        : signInWithEmailAndPassword(authentication, normalizedEmail, password)
    )
    .then(async viewer => {
      if (isSignUp) {
        const user: UserType = {
          id: viewer.user.uid,
          pseudonyme,
          email: normalizedEmail,
          imageUrl: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await setDoc(doc(db, 'users', viewer.user.uid), user)
      }

      navigate(`/u/${viewer.user.uid}`)
    })
    .catch(error => {
      switch (error.code) {
        case 'auth/invalid-email': {
          setError('The email you entered is invalid.')
          break
        }
        case 'auth/wrong-password': {
          setError('The password you entered is incorrect.')
          break
        }
        default: {
          setError(`An error occured: ${error.code || error.message}.`)
          break
        }
      }

      setLoadingEmail(false)
    })
  }, [email, isSignUp, pseudonyme, navigate, password])

  if (loadingProvider) {
    return (
      <FullScreenSpinner />
    )
  }

  return (
    <>
      <Flex
        direction="column"
        flexGrow={1}
        align="center"
        justify="center"
        justifyContent-mobile="flex-start"
        mb={6}
        paddingLeft-mobile={16}
        paddingRight-mobile={16}
      >
        <Flex
          direction="column"
          maxWidth={512 + 96}
          width-mobile-up={512 + 96}
        >
          <Flex
            align="center"
            gap={1}
            justify="space-between"
          >
            <P
              fontSize={32}
              fontSize-mobile={24}
              fontWeight="bold"
            >
              Welcome, teammate.
            </P>
            <Button
              type="button"
              secondary
              large
              flexGrow={0}
              border="none"
              as={Link}
              to={isSignUp ? '/sign-in' : '/sign-up'}
              ml={2}
            >
              {isSignUp ? 'Sign in' : 'New here? Sign up'}
            </Button>
          </Flex>
          <Button
            large
            startIcon={(
              <GoogleIcon width={24} />
            )}
            secondary
            mt={2}
            onClick={handleGoogleClick}
          >
            Sign {inOrUp} with Google
          </Button>
          {/* <Button
          large
          startIcon={(
            <FacebookIcon width={24} />
          )}
          secondary
          mt={0.5}
          onClick={handleFacebookClick}
        >
          Sign {inOrUp} with Facebook
        </Button> */}
          {/* <Button
          large
          startIcon={(
            <AppleIcon width={24} />
          )}
          secondary
          mt={0.5}
          onClick={handleAppleClick}
        >
          Sign {inOrUp} with Apple
        </Button> */}
          {/* <Button
          large
          startIcon={(
            <MicrosoftIcon width={24} />
          )}
          secondary
          mt={0.5}
          onClick={handleMicrosoftClick}
        >
          Sign {inOrUp} with Microsoft
        </Button> */}
          <P
            mt={2}
            textAlign="center"
          >
            - Or use your email to sign {inOrUp} -
          </P>
          <Form onSubmit={handleSubmit}>
            {isSignUp && (
              <Input
                large
                name="name"
                autoComplete="name"
                value={pseudonyme}
                onChange={e => setPseudonyme(e.target.value)}
                startIcon={(
                  <MdPerson />
                )}
                placeholder="Name"
                width="100%"
                mt={2}
              />
            )}
            <Input
              large
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              startIcon={(
                <MdEmail />
              )}
              placeholder="Work email"
              width="100%"
              mt={isSignUp ? 1 : 2}
            />
            <Input
              large
              name="password"
              autoComplete="password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              startIcon={(
                <Icon
                  cursor="pointer"
                  onClick={() => setIsPasswordVisible(x => !x)}
                >
                  {isPasswordVisible ? <IoMdEye /> : <IoMdEyeOff />}
                </Icon>
              )}
              placeholder="Password"
              width="100%"
              mt={1}
            />
            {/* {!isSignUp && (
              <Flex
                justify="flex-end"
                mt={0.25}
              >
                <A
                  fontSize={14}
                  onClick={() => setIsPasswordRecoveryModalOpen(true)}
                >
                  I forgot my password
                </A>
              </Flex>
            )} */}
            <Button
              large
              loading={loadingEmail}
              flexGrow={8}
              type="submit"
              width="100%"
              mt={2}
            >
              Sign {inOrUp}
            </Button>
          </Form>
          <P
            color="red"
            mt={1}
          >
            {error || <>&nbsp;</>}
          </P>
        </Flex>
      </Flex>
      {/* <PasswordRecoveryModal
        open={isPasswordRecoveryModalOpen}
        onClose={() => setIsPasswordRecoveryModalOpen(false)}
        email={email}
        setEmail={setEmail}
      /> */}
    </>
  )
}

export default Authentication
