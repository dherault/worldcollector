import type { DatabaseResource } from '~types'

function sortUpdatedAt(a: DatabaseResource, b: DatabaseResource) {
  return b.updatedAt.localeCompare(a.updatedAt)
}

export default sortUpdatedAt
