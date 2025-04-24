import _ from 'clsx'

type Props = {
  size: number
  progress: number
  className?: string
}

function CircularProgress({ size, progress, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
    >
      <circle
        cx="16"
        cy="16"
        r="13"
        fill="none"
        className="stroke-current text-neutral-200"
        strokeWidth="5"
      />
      <g className="origin-center -rotate-90 transform">
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          className={_('stroke-current', className)}
          strokeWidth="5"
          strokeDasharray="100"
          strokeLinecap="round"
          strokeDashoffset={100 - progress * 80}
        />
      </g>
    </svg>
  )
}

export default CircularProgress
