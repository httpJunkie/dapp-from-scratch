import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

import Switch from '../ui-components/switch/Switch'

const Foot = () => {
  const context = useContext(AppContext)
  const isLight = context.themeMode === 'light'

  const handleSwitch = () => {
    context.changeTheme(isLight ? 'dark' : 'light')
  }
  
  return (
    <>
      <div className="left">
        🚀 Wen Moon 
      </div>
      <div className="right">
        <Switch onChange={handleSwitch} />
      </div>
    </>
  )
}

export default Foot