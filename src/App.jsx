import { Routes, Route } from 'react-router-dom'
import { Navbar } from './component/navbar/Navbar'
import { LandingPage } from './page/LandingPage'
import { LoginPage } from './page/LoginPage'
import { Dashboard } from './page/Dashboard'
import { UsersPage } from './page/Centre/UsersPage'
import { ClassesPage } from './page/Centre/ClassesPage'
import { CalendarPage } from './page/Centre/CalendarPage'

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
