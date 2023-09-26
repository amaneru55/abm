import React from 'react'
import {Button, Tooltip} from "@nextui-org/react";
import {useAtom} from "jotai";
import {sidebarExpandedAtom} from "@/store/global.ts";
import IconRight from "@icons/Right.tsx";

const ExpandBtn: React.FC = () => {
  const [expanded, setExpanded] = useAtom(sidebarExpandedAtom)

  const toggleExpanded = () => {
    setExpanded(e => !e)
  }

  return (
    <Tooltip content={expanded ? '收起' : '展开'} placement={'right'}>
      <Button
        aria-expanded={expanded}
        size={'sm'}
        isIconOnly
        onClick={toggleExpanded}
        variant={'flat'}
        className={'rotate-0 aria-expanded:rotate-180 transition-transform ease-soft-spring duration-300'}
      >
        <IconRight className={'text-lg'} />
      </Button>
    </Tooltip>
  )
}

export default ExpandBtn
