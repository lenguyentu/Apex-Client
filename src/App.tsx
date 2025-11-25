import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Dashboard from './pages/dashboard'
import Jobs from './pages/jobs'
import InterviewProcess from './pages/interview-process'
import Candidates from './pages/candidates'
import Evaluations from './pages/evaluations'
import Settings from './pages/settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="interview-process" element={<InterviewProcess />} />
          <Route path="candidates" element={<Candidates />} />
          <Route path="evaluations" element={<Evaluations />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
