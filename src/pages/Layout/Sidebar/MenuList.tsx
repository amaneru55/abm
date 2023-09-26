import * as EPaths from "@shared/enums/paths.ts";
import React from "react";
import IconBxsDashboard from "@icons/BxsDashboard.tsx";
import IconApps from "@icons/Apps.tsx";
import IconListTask from "@icons/ListTask.tsx";
import IconBxMessageDetail from "@icons/BxMessageDetail.tsx";
import IconSettings from "@icons/Settings.tsx";
import {useMatch, useNavigate} from "react-router-dom";
import {ScrollShadow, Spacer} from "@nextui-org/react";

type MenuItem = {
  path: EPaths.Layout,
  icon: React.ReactNode,
  name: string,
}

const menuList: MenuItem[] = [
  {
    path: EPaths.Layout.DASHBOARD,
    icon: <IconBxsDashboard className={'text-xl'} />,
    name: '仪表盘',
  },
  {
    path: EPaths.Layout.APPS,
    icon: <IconApps className={'text-xl'} />,
    name: '应用中心',
  },
  {
    path: EPaths.Layout.TASKS,
    icon: <IconListTask className={'text-xl'} />,
    name: '任务管理',
  },
  {
    path: EPaths.Layout.EVENTS,
    icon: <IconBxMessageDetail className={'text-xl'} />,
    name: '事件管理',
  },
  {
    path: EPaths.Layout.SETTING,
    icon: <IconSettings className={'text-xl'} />,
    name: '系统设置',
  }
]

const useMenuItem = (item: MenuItem) => {

  const {
    path,
    icon,
    name,
  } = item

  const navigate = useNavigate()
  const match = useMatch({
    path,
    end: path.length === 0,
  })

  const selected = match !== null

  const handleClick = (path: EPaths.Layout) => {
    navigate(path)
  }

  return {
    path,
    icon,
    name,
    selected,
    handleClick,
  }
}

const MenuItem: React.FC<{ item: MenuItem }> = (
  {
    item,
  }
) => {
  const {
    path,
    icon,
    name,
    selected,
    handleClick,
  } = useMenuItem(item)

  return (
    <li
      aria-selected={selected}
      key={path}
      className={`
        relative
        aria-selected:before:content-[""]
        aria-selected:before:block
        aria-selected:before:absolute
        aria-selected:before:top-0
        aria-selected:before:left-0
        aria-selected:before:w-1
        aria-selected:before:bottom-0
        aria-selected:before:bg-secondary
      `}
      onClick={() => handleClick(path)}
    >
      <div
        aria-selected={selected}
        className={`
          py-3 px-3 overflow-hidden flex
          items-center 
          cursor-pointer
          hover:bg-gray-100
          dark:hover:bg-gray-900
          active:bg-gray-200
          dark:active:bg-gray-800
          aria-selected:bg-secondary/10
          aria-selected:text-secondary
          transition-colors ease-soft-spring duration-300
          rounded-md
        `}
      >
        <div className={'shrink-0'}>
          {icon}
        </div>
        <Spacer x={3} />
        <p className={'whitespace-nowrap grow truncate'}>
          {name}
        </p>
      </div>
    </li>
  )
}

const MenuList: React.FC = () => {
  return (
    <ScrollShadow hideScrollBar className={'h-full w-full'}>
      <nav className={'h-[3000px]'}>
        <ol>
          {
            menuList.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))
          }
        </ol>
      </nav>
    </ScrollShadow>
  )
}

export default MenuList
