import React from 'react'
import * as vars from '../utils/constants'

export const themes = {
  default: {
    suffix: "",
    gradient1: vars.GRADIENT_COLOR1,
    gradient2: vars.GRADIENT_COLOR2,
    background: "#fff",
    color: "#555",
  },
  dark: {
    suffix: "-dark",
    gradient1: vars.GRADIENT_DARK1,
    gradient2: vars.GRADIENT_DARK2,
    background: "#111",
    color: "#fff",
  }
}

export default React.createContext( themes.dark );