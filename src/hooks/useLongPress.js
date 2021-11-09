import { useRef, useEffect, useState } from 'react'

export default function useLongPress(ref) {
  const LONG_PRESS_MS = 500

  const timer = useRef(null)
  const [longPress, setLongPress] = useState(false)

  function disableMenu(e) {
    e.preventDefault()
  }

  function downHandler(e) {

    if (!timer.current) {
      timer.current = setTimeout(() => {
        setLongPress(true)
        timer.current = null
      }, LONG_PRESS_MS)
    }
  }

  function upHandler(e) {

    if(timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }

    setLongPress(false)
  }

  useEffect(() => {
    const ele = ref.current;
    if(!ele) return

    ele.addEventListener('touchstart', downHandler)
    ele.addEventListener('touchend', upHandler)
    ele.addEventListener('contextmenu', disableMenu)
    return(() => {
      ele.removeEventListener('touchstart', downHandler)
      ele.removeEventListener('touchend', upHandler)
      ele.removeEventListener('contextmenu', disableMenu)
    })
    // eslint-disable-next-line
  }, [ref.current])

  return longPress
}