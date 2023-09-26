import React from 'react'
import {useAtomValue} from "jotai";

import {sidebarExpandedAtom} from "@/store/global.ts";
import MenuList from "./MenuList.tsx";
import ExpandBtn from "./ExpandBtn.tsx";
import AuthUser from "./AuthUser.tsx";


const Sidebar: React.FC = () => {
  const expanded = useAtomValue(sidebarExpandedAtom)

  return (
    <aside
      aria-expanded={expanded}
      className={`
        fixed top-0 bottom-0 left-0 w-11 aria-expanded:w-64
        outline outline-1 outline-gray-200 dark:outline-gray-800
        transition-width ease-soft-spring duration-300 py-2
        flex flex-col items-stretch gap-y-1
      `}
    >
      <div className={'shrink-0 flex justify-end items-center w-full px-1.5'}>
        <ExpandBtn />
      </div>
      <div className={'grow overflow-hidden'}>
        <MenuList />
      </div>
      <div className={'shrink-0 overflow-hidden leading-none'}>
        <AuthUser />
      </div>
    </aside>
  )
}

export default Sidebar
