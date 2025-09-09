import './App.css'
import ReportesLayout from './components/ReportesLayout/ReportesLayout'
import Header from './components/Header/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthLogin from './components/Auth/AuthLogin'
import RandomSquaresBackground from './components/Layout/RandomSquaresBackground'

function App() {
  return (
    <BrowserRouter>
    <Header />
    <RandomSquaresBackground/>
    <Routes>
      <Route path="/login" element={<AuthLogin />} />
      <Route path="/" element={<ReportesLayout />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
