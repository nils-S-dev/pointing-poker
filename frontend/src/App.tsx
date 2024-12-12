import { useState } from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'

function App() {
  return (
    <article className="w-full text-gray-100">
      <header>Header</header>
      <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="room" element={<RoomPage />} />
      </Routes>
        <button className="p-2 rounded-xl bg-sky">a button</button>
      </main>
      <footer>
        Footer
      </footer>
    </article>
  )
}

export default App
