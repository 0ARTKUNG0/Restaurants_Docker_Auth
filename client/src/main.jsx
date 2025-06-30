import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import AddRestaurant from './Pages/AddRestaurant'
import router from './routes/Routes'
import { RouterProvider } from 'react-router-dom'
import UpdateRestaurant from './Pages/UpdateRestaurant'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)