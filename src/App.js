import './App.css'
import Menu from './pages/Home'
import Questions from './pages/Quiz'
import FinalScreen from './pages/Results'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Menu />} />
          <Route path='/quiz' element={<Questions />} />
          <Route path='/results' element={<FinalScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
