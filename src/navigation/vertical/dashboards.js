import { Home, Circle, PlusCircle } from 'react-feather'

export default [
  {
    id: 'products',
    title: 'Products',
    icon: <Home size={20} />,
    badge: 'light-warning',
    badgeText: '2',
    children: [
      {
        id: 'create',
        title: 'Create',
        icon: <Circle size={12} />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'update',
        title: 'Update Product',
        icon: <Circle size={12} />,
        navLink: '/dashboard/ecommerce'
      }
    ]
  }
]
