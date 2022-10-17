import { Link, useParams } from 'react-router-dom'
import { Div, H1 } from 'honorable'

import useUserById from '../hooks/useUserById'
import useCollectiblesByOwnerId from '../hooks/useCollectiblesByOwnerId'

import LayoutContainer from '../components/LayoutContainer'
import FullScreenSpinner from '../components/FullScreenSpinner'
import FullScreeNotFound from '../components/FullScreenNotFound'

function Portfolio() {
  const { id = '' } = useParams()
  const { user, loadingUser } = useUserById(id)
  const { collectibles, loadingCollectibles } = useCollectiblesByOwnerId(id)

  if (loadingUser || loadingCollectibles) {
    return (
      <FullScreenSpinner />
    )
  }

  if (!user) {
    return (
      <FullScreeNotFound />
    )
  }

  return (
    <LayoutContainer>
      <H1>{user.pseudonyme}</H1>
      <Div>
        {collectibles.map(item => (
          <Div
            mr={1}
            mb={1}
            key={item.id}
          >
            <Link to={`/~/${item.id}`}>
              {item.name}
            </Link>
          </Div>
        ))}
      </Div>
    </LayoutContainer>
  )
}

export default Portfolio
