import React from 'react'
import './App.scss'
import routes from '@/router'
import { useRoutes } from 'react-router-dom'

function App() {
  const ele = useRoutes(routes)
  return <div className="app">{ele}</div>
}

export default App
