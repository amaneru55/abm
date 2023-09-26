import React from 'react'
import {Avatar, Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {useAtomValue} from "jotai";

import {useCurrentUser} from "@data/use-user.ts";
import {sidebarExpandedAtom} from "@/store/global.ts";
import IconDocument from "@icons/Documnet.tsx";
import IconBxKey from "@icons/BxKey.tsx";
import IconLogoutVariant from "@icons/LogoutVariant.tsx";

const AuthUser: React.FC = () => {
  const expanded = useAtomValue(sidebarExpandedAtom)
  const {
    data: user
  } = useCurrentUser()

  return (
    <Popover placement={'right-end'} showArrow>
      <PopoverTrigger>
        <Button
          aria-expanded={expanded}
          variant={'light'}
          className={'aria-expanded:mx-0 leading-none mx-0.5 rounded-full aria-expanded:rounded-md transition-all ease-soft-spring duration-300'}
          fullWidth
          isIconOnly={!expanded}
          startContent={(
            <Avatar name={user?.username || '-'} color={'secondary'} size={'sm'} />
          )}
        >
          {
            expanded ? (
              <div>
                <p className={''}>{user?.username}</p>
                <p className={'text-sm text-default-400'}>{user?.role}</p>
              </div>
            ) : null
          }
        </Button>
      </PopoverTrigger>
      <PopoverContent className={'px-0'}>
        <Listbox>
          <ListboxItem
            key={'api_doc'}
            startContent={(
              <IconDocument className={'text-lg'} />
            )}
            variant={'flat'}
          >
            接口文档
          </ListboxItem>
          <ListboxItem
            key={'change_pwd'}
            startContent={(
              <IconBxKey className={'text-lg'} />
            )}
            variant={'flat'}
          >
            修改密码
          </ListboxItem>
          <ListboxItem
            key={'logout'}
            startContent={(
              <IconLogoutVariant className={'text-lg'} />
            )}
            variant={'flat'}
            color={'danger'}
            className={'text-danger'}
          >
            退出登录
          </ListboxItem>
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}

export default AuthUser
