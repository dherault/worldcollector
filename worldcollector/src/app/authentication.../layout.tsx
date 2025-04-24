import composeLayout from '~utils/layout/composeLayout'

import AuthenticationRedirect from '~components/authentication/AuthenticationRedirect'
import AuthenticationLayout from '~components/authentication/AuthenticationLayout'

export default composeLayout(
  AuthenticationRedirect,
  AuthenticationLayout,
)
