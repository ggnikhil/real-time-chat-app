import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './app.routes'
import "../features/shared/global.scss"

const App = () => {
  return (
    <div>
      <RouterProvider router={AppRouter}/>
    </div>
  )
}

export default App
