import { useState, useEffect } from 'react'

/**
 * Hook returning element's width/height when its size changes.
 * @ref : react ref that points to target element.
 * return : object {width, height} of the target element.
 */
export default function useResize(ref) {
  const [dimension, setDimension] = useState({width: 0, height: 0})

  function handleResize(entries) {
    const entry = entries[0]
    const {width, height} = entry.contentRect
    setDimension({
      width: width,
      height: height
    })
    console.log(`handleResize: (${width}, ${height})`);
  }

  useEffect(() => {
    const ele = ref.current
    if(!ele) return

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(ele)
    return () => {
      resizeObserver.disconnect()
    }
  // eslint-disable-next-line
  }, [ref.current])

  return dimension
}
