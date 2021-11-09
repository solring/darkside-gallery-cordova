import { useState, useLayoutEffect } from 'react'

/**
 * Hook returning element's width/height when window size changes.
 * @ref : react ref that points to target element.
 * return : object {width, height} of the target element.
 */
export default function useClientSize(ref) {
  const [dimension, setDimension] = useState({width: 0, height: 0})

  function handleResize() {
    const ele = ref.current
    if(!ele) return

    const [w, h] = [ele.clientWidth, ele.clientHeight]
    setDimension({
      width: ele.clientWidth,
      height: ele.clientHeight
    })
    console.log(`handleResize: (${w}, ${h})`);
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('load', handleResize)
    }
  }, [])

  return dimension
}
