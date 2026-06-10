import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/navbar/Navbar'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { UsersPage } from './pages/Centre/UsersPage'
import { ClassesPage } from './pages/Centre/ClassesPage'
import { CalendarPage } from './pages/Centre/CalendarPage'

function App() {
  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <main className="flex flex-col h-full mt-[64px] bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App
