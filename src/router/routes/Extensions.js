import { lazy } from 'react'

const ExtensionsRoutes = [
  {
    path: '/extensions/sweet-alert',
    component: lazy(() => import('../../views/extensions/sweet-alert'))
  },
  {
    path: '/extensions/blockui',
    component: lazy(() => import('../../views/extensions/block-ui'))
  },
  {
    path: '/extensions/toastr',
    component: lazy(() => import('../../views/extensions/toastify'))
  },
  {
    path: '/extensions/slider',
    component: lazy(() => import('../../views/extensions/sliders'))
  },
  {
    path: '/extensions/drag-and-drop',
    component: lazy(() => import('../../views/extensions/drag-and-drop'))
  },
  {
    path: '/extensions/tour',
    component: lazy(() => import('../../views/extensions/tour'))
  },
  {
    path: '/extensions/clipboard',
    component: lazy(() => import('../../views/extensions/copy-to-clipboard'))
  },
  {
    path: '/extensions/react-player',
    component: lazy(() => import('../../views/extensions/react-player'))
  },
  {
    path: '/extensions/context-menu',
    component: lazy(() => import('../../views/extensions/context-menu'))
  },
  {
    path: '/extensions/swiper',
    component: lazy(() => import('../../views/extensions/swiper'))
  },
  {
    path: '/access-control',
    component: lazy(() => import('../../views/extensions/access-control')),
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path : '/product-categories/:string',
    component : lazy(() => import('../../views/ui-elements/cards/advance/Categoriesproduct')),
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path : '/product-discription/:string',
    component : lazy(() => import('../../views/ui-elements/cards/advance/Productdescription')),
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path : '/Orders',
    component : lazy(() => import('../../views/ui-elements/cards/advance/Orders')),
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path: '/extensions/ratings',
    component: lazy(() => import('../../views/extensions/ratings'))
  },
  {
    path: '/extensions/pagination',
    component: lazy(() => import('../../views/extensions/pagination'))
  },
  {
    path: '/extensions/import',
    component: lazy(() => import('../../views/extensions/import-export/Import'))
  },
  {
    path: '/extensions/export',
    component: lazy(() => import('../../views/extensions/import-export/Export'))
  },
  {
    path: '/extensions/export-selected',
    component: lazy(() => import('../../views/extensions/import-export/ExportSelected'))
  },
  {
    path: '/extensions/i18n',
    component: lazy(() => import('../../views/extensions/i18n'))
  }
]

export default ExtensionsRoutes
