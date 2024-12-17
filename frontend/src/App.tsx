import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import Header from './components/Header'
import Footer from './components/Footer'
import JoinPage from './pages/JoinPage'

function App() {
  return (
    <article className="w-full text-gray-100">
      <Header />
      <main className="max-w-[1400px] mx-auto min-h-[80vh] pt-12 px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="room/:room" element={<RoomPage />} />
          <Route path="join" element={<JoinPage />} />
        </Routes>
      </main>
      <Footer />
    </article>
  )
}

export default App
