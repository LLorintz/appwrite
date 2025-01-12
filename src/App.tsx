import { BrowserRouter, Routes, Route } from "react-router-dom"
import Notes from "./Pages/Notes"
import Login from "./Pages/Login"


function App() {


  return (
  <div id="app" data-theme='dark'>
    <div id="container">
      <BrowserRouter>
        <Routes>
          <Route element={<Notes></Notes>} path="/"/>
          <Route element={<Login></Login>} path="/login"/>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  )
}

export default App
