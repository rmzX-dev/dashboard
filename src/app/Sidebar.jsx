import { Link, useLocation } from 'react-router-dom'
import { Users, ShieldCheck, MapPin } from 'lucide-react'

export default function Sidebar() {
    const location = useLocation()

    const menuItems = [
        { id: 'users', label: 'Usuarios', icon: Users, path: '/users' },
        {
            id: 'locations',
            label: 'Ubicaciones',
            icon: MapPin,
            path: '/locations',
        },
        { id: 'admins', label: 'Admins', icon: ShieldCheck, path: '/admins' },
    ]

    return (
        <aside className="w-64 bg-white h-screen border-r border-gray-200 px-4 py-5">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-2xl font-semibold text-blue-600">
                    MiPanel
                </h1>
            </div>

            <nav className="space-y-2">
                {menuItems.map(({ id, label, icon: Icon, path }) => {
                    const active = location.pathname === path

                    return (
                        <Link
                            key={id}
                            to={path}
                            className={`
                flex items-center gap-3 h-12 px-3 rounded-lg transition
                ${
                    active
                        ? 'bg-gray-100 text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                }
              `}
                        >
                            <Icon className="h-5 w-5" />
                            <span className="font-medium">{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </aside>
    )
}
