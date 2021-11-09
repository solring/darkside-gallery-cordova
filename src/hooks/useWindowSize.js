import { useState, useEffect } from 'react'

/**
 * Hook returning window OUTER width/height when its size changes.
 * @ref : react ref that points to target element.
 * return : object {width, height} of the target element.
 */
export default function useWindowSize() {
  const [dimension, setDimension] = useState({width: 0, height: 0})

  function handleResize() {

    const [width, height] = [window.outerWidth, window.outerHeight]
    setDimension({
      width: width,
      height: height
    })
    console.log(`handleResize: (${width}, ${height})`);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)
    return () => {
      window.addEventListener('resize', handleResize)
      window.addEventListener('load', handleResize)
    }
  // eslint-disable-next-line
  }, [])

  return dimension
}