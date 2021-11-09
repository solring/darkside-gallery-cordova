import React, { useState } from 'react'
import { useMedia } from 'react-use'

import LayoutPhone from '../layout/LayoutPhone'
import LayoutWide from '../layout/LayoutWide'

import Sidebar from './Sidebar'
import Gallery from './Gallery'
import Switch from './Switch'
import ThemeContext, { themes } from '../context/ThemeContext'
import Icon from './Icon'

import * as vars from '../utils/constants'

function MainScreen() {

  const [dark, setDark] = useState(false)

  const isPhone = useMedia(`(max-width: ${vars.BS_BREAKPOINT_MD})`)

  const Layout = isPhone ? LayoutPhone : LayoutWide
  
  const sidebar = (
    <Sidebar fullscreen={isPhone} footer={
      <Switch
        val={dark}
        setVal={setDark}
        style={{ zIndex: 1070 }}
        txt={
          <Icon name="dark_mode" size="lg"/>
        }
      />
    }/>
  )

  return (
    <ThemeContext.Provider value={dark ? themes.dark : themes.default}>
      <Layout
        header={sidebar}
      >
        <Gallery />
      </Layout>
    </ThemeContext.Provider>
  )
}

export default MainScreen

