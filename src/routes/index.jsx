import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ToastProvider } from '../components/ui/ToastContainer'
import AppLayout from '../app/AppLayout.jsx'
import UsersPage from '../features/users/UsersPage.jsx'
gimport LocationsPage from '../features/locations/LocationsPage.jsx'
import PointsOfInterestPage from '../features/pointsOfInterest/PointsOfInterestPage.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ToastProvider>
                <AppLayout />
            </ToastProvider>
        ),
        children: [
            { path: 'users', element: <UsersPage /> },
            { path: 'locations', element: <LocationsPage /> },
            { path: 'points-of-interest', element: <PointsOfInterestPage /> },
        ],
    },
])
