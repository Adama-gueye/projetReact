import React from 'react'
import Article from './components/Article'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <Routes>
      <Route path="/article" element={<Article />}></Route>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<SignUp />}></Route>
      {/* <Route path="/articleAmi" element={<ArticleAmi />}></Route> */}
    </Routes>
  )
}

export default App