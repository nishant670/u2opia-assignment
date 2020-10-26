import React from 'react'
import './App.css'

import AppRoutes from '../../appRoutes/AppRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className="app-wrapper">
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  )
}

export default App;
