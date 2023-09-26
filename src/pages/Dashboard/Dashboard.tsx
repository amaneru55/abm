import React from 'react'
import {Button} from "@nextui-org/react";
import {useAtomValue, useSetAtom} from "jotai";
import {sidebarExpandedAtom} from "@/store/global.ts";

const Dashboard: React.FC = () => {
  const expanded = useAtomValue(sidebarExpandedAtom)
  const setExpanded = useSetAtom(sidebarExpandedAtom)
  const toggle = () => setExpanded(o => !o)

  const toggleTheme = () => {
    if (document.documentElement.className === 'dark') {
      document.documentElement.className = 'light'
    } else {
      document.documentElement.className = 'dark'
    }
  }

  return (
    <div className={'px-2 h-[3000px]'}>
      <Button onClick={toggle}>Toggle</Button>
      <p>expanded: {expanded + ''}</p>
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <p>theme: {document.documentElement.className}</p>
    </div>
  )
}

export default Dashboard
