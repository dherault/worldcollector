import Spinner from '~components/common/Spinner'

type Props = {
  source: string
}

function CenteredSpinner({ source }: Props) {
  return (
    <div
      role="status"
      className="grow h-full flex flex-col items-center justify-center"
    >
      <Spinner className="w-8 h-8" />
      {import.meta.env.DEV && (
        <div className="mt-2 text-xs">
          {source}
        </div>
      )}
    </div>
  )
}

export default CenteredSpinner
