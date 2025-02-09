import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CreateTrip from './create-trip'
import Header from './components/custom/header'
import Footer from './components/custom/footer'
import { Toaster } from 'sonner'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/create-trip',
    element: <CreateTrip/>,
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Toaster/>
    <RouterProvider router={router}/>
    <Footer/>
  </StrictMode>,
)
