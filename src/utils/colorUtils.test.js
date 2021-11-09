import { RGBtoHex, hexToRGB } from "./colorUtils"

test('RGB to HEX', () => {

  let black = RGBtoHex([0, 0, 0])
  expect(black).toBe("#000000")

  let white = RGBtoHex([255, 255, 255])
  expect(white).toBe("#ffffff")

  let c1 = RGBtoHex([17, 146, 153])
  expect(c1).toBe("#119299")

  let c2 = RGBtoHex([3, 3, 3])
  expect(c2).toBe("#030303")

  // invalid input
  let wrong = RGBtoHex([153])
  expect(wrong).toBe("")
  wrong = RGBtoHex([153, 66])
  expect(wrong).toBe("")
  wrong = RGBtoHex(333)
  expect(wrong).toBe("")
  wrong = RGBtoHex()
  expect(wrong).toBe("")

})

test('HEX to RGB', () => {
  let black = hexToRGB("#000000")
  expect(black).toEqual([0,0,0])

  let white = hexToRGB("#ffffff")
  expect(white).toEqual([255,255,255])

  let c1 = hexToRGB("#119299")
  expect(c1).toEqual([17, 146, 153])

  let c2 = hexToRGB("#030303")
  expect(c2).toEqual([3, 3, 3])


  // invalid input
  let wrong = hexToRGB('#333')
  expect(wrong).toEqual([255,255,255])
})

