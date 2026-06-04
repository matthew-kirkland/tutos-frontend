import { Routes, Route } from 'react-router-dom'
import { Navbar } from './component/navbar/Navbar'
import { LandingPage } from './page/LandingPage'
import { LoginPage } from './page/LoginPage'

function App() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <main className="flex flex-col h-full mt-[64px] bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
