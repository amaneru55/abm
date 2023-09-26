import React from 'react'

const useInputFocus = (focusKey = '/') => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(
    () => {
      const keyUpHandler = (e: KeyboardEvent) => {
        if (e.key !== focusKey) {
          return
        }

        inputRef.current
        && (document.activeElement === document.body || !document.activeElement)
        && inputRef.current.focus()
      }

      document.addEventListener('keyup', keyUpHandler)

      return () => {
        document.removeEventListener('keyup', keyUpHandler)
      }
    },
    [focusKey]
  )

  return inputRef
}

export default useInputFocus