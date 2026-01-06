import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import './index.css'
import Root from './Layout/Root'
import DashboardLayout from './Layout/DashboardLayout'
import AuthProvider from './contexts/AuthProvider';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './Pages/Profile';
import Services from './Pages/Services';
import AddServices from './Pages/AddServices';
import MyBookings from './Pages/MyBookings';
import MyServices from './Pages/MyServices';
import ServiceDetail from './Pages/ServiceDetail';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';
import PrivateRoute from './Route/PrivateRoute';

// Additional Pages
import About from './Pages/About';
import Contact from './Pages/Contact';
import Terms from './Pages/Terms';
import Privacy from './Pages/Privacy';

// Admin Pages
import UsersManagement from './Pages/UsersManagement';
import BookingsManagement from './Pages/BookingsManagement';
import Analytics from './Pages/Analytics';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'services',
        Component: Services
      },
      {
        path: 'service/:_id',
        Component: ServiceDetail
      },
      {
        path: 'about',
        Component: About
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: 'terms',
        Component: Terms
      },
      {
        path: 'privacy',
        Component: Privacy
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      // Legacy routes for backward compatibility
      {
        path: 'add-service',
        element: <PrivateRoute><AddServices /></PrivateRoute>
      },
      {
        path: 'bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
      {
        path: 'my-services',
        element: <PrivateRoute><MyServices /></PrivateRoute>
      },
      {
        path: "*",
        element: <ErrorPage/>
      },
    ]
  },
  // Dashboard Routes
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        index: true,
        Component: Dashboard
      },
      {
        path: 'profile',
        Component: Profile
      },
      {
        path: 'services',
        Component: MyServices
      },
      {
        path: 'add-service',
        Component: AddServices
      },
      {
        path: 'bookings',
        Component: MyBookings
      },
      // Admin routes
      {
        path: 'users',
        element: <PrivateRoute><UsersManagement /></PrivateRoute>
      },
      {
        path: 'admin-bookings',
        element: <PrivateRoute><BookingsManagement /></PrivateRoute>
      },
      {
        path: 'analytics',
        element: <PrivateRoute><Analytics /></PrivateRoute>
      }
    ]
  }
]) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
)