import {atom, createStore} from "jotai";
import {atomWithStorage} from "jotai/utils";

export const globalStore = createStore()

export const sidebarExpandedAtom = atom(false)

export const themeAtom = atomWithStorage('theme', 'light')
