import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ItemPage from './page/ItemPage'

const router = () => {
  return (
    <Routes>
      <Route path="*" element={<ItemPage />} />
    </Routes>
  )
}

export default router
