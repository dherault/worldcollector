import useUser from '~hooks/user/useUser'

import AccountPasswordForm from '~components/account/AccountPasswordForm'
import AccountNameForm from '~components/account/AccountNameForm'

function Account() {
  const { user } = useUser()

  return (
    <div className="space-y-4">
      <section>
        <h2 className="mb-1 font-bold">
          Email
        </h2>
        <div>
          {user?.email}
        </div>
      </section>
      <AccountNameForm />
      <AccountPasswordForm />
    </div>
  )
}

export default Account
