import type { PropsWithChildren } from 'react'
import { Info } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipTrigger } from '~components/ui/Tooltip'

type Props = PropsWithChildren<{
  className?: string
}>

function InfoTooltip({ className, children }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger className={className}>
        <Info className="h-4 w-4 text-neutral-500" />
      </TooltipTrigger>
      <TooltipContent className="max-w-64">
        {children}
      </TooltipContent>
    </Tooltip>
  )
}

export default InfoTooltip
