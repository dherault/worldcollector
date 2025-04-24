import type { ComponentProps } from 'react'
import { Info } from 'lucide-react'

import { Popover, PopoverContent, PopoverTrigger } from '~components/ui/Popover'

type Props = ComponentProps<typeof PopoverContent>

function InfoPopover(props: Props) {
  return (
    <Popover>
      <PopoverTrigger>
        <Info className="h-4 w-4 text-neutral-500" />
      </PopoverTrigger>
      <PopoverContent {...props} />
    </Popover>
  )
}

export default InfoPopover
