import {useState, useLayoutEffect} from 'react'

/**
 * Hook to get scrolling position with throttle option
 * @ele : ref to the scrollable element
 * @delay : throttle time gap in millisecond
 * return: an array of coordinators [x, y]
 */
export default function useScrollThrottle(ele = window, delay) {
  const [pos, setPos] = useState([0, 0])

  let throttling = null

  function onScroll(e) {

    function doMeasure() {
      const x = ele === window ? window.scrollX : ele.current.scrollLeft
      const y = ele === window ? window.scrollY : ele.current.scrollTop
      setPos([x, y])
      throttling = false
    }

    if(!delay || delay === 0) {
      doMeasure();
    } else {
      if (!throttling) {
        throttling = true
        setTimeout(doMeasure, delay)
      }
    }
  }

  useLayoutEffect(() => {
    const node = ele.current
    if(!node) return

    node.addEventListener('scroll', onScroll)
    return () => {
      node.removeEventListener('scroll', onScroll)
    }
  })

  return pos
}
