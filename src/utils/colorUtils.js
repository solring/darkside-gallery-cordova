 function RGBtoHex(color) {
  if (!Array.isArray(color) || color.length < 3) return ""

  let cc = color.map((c) => {
    let str = c.toString(16)
    if(str.length < 2) str = '0' + str
    return str
  })

  return `#${cc[0]}${cc[1]}${cc[2]}`
}

function hexToRGB(color) {
  if(typeof color !== 'string' || color.length !== 7) return [255, 255, 255]
  let r = '0x' + color[1] + color[2]
  let g = '0x' + color[3] + color[4]
  let b = '0x' + color[5] + color[6]

  return [
    Number.parseInt(r),
    Number.parseInt(g),
    Number.parseInt(b),
  ]
}

function hexToRGBAStr(color, opacity) {
  const [r, g, b] = hexToRGB(color)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export { RGBtoHex, hexToRGB, hexToRGBAStr }