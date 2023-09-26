import React from 'react'
import {useAtomValue} from "jotai";
import {Outlet} from "react-router-dom";

import Sidebar from "./Sidebar";
import {sidebarExpandedAtom} from "@/store/global.ts";

const Layout: React.FC = () => {
  const expanded = useAtomValue(sidebarExpandedAtom)
  return (
    <>
      <Sidebar />
      <main
        aria-expanded={expanded}
        className={'pl-11 aria-expanded:pl-64 transition-spacing ease-in-out duration-300'}
      >
        <Outlet />
      </main>
    </>
  )
}

export default Layout
