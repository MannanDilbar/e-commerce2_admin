import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilCursor,
  cilPin,
} from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Suggestions',    
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Suggestion Products',
        to: '/suggest-products',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Basic Data',   
    icon: <CIcon icon={cilPin} customClassName="nav-icon" />,
    items: [
      
      {
        component: CNavItem,
        name: 'Categories',
        to: '/categories',
      },
      {
        component: CNavItem,
        name: 'SubCategories',
        to: '/subcategories',
      },
      {
        component: CNavItem,
        name: 'Products',
        to: '/products',
      }
      ,
      {
        component: CNavItem,
        name: 'Shipping',
        to: '/shipping',
      }
    ],
  },  
  {
    component: CNavGroup,
    name: 'Users',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Admins',
        to: '/admins',
      },
      
      {
        component: CNavItem,
        name: 'Vendors',
        to: '/vendors',
      },
      {
        component: CNavItem,
        name: 'Customers',
        to: '/customers',
      },

    ],
  },
 
  
  {
    component: CNavGroup,
    name: 'Orders',
    to: '/wait',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders',
      }
    ],
  },
  {
    component: CNavGroup,
    name: 'Reports',
    to: '/wait',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders',
      }
    ],
  },
  
  {
    component: CNavGroup,
    name: 'Statistics',
    to: '/wait',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users',
        to: '/users-statistics',
      },
      {
        component: CNavItem,
        name: 'Products',
        to: '/products-statistics',
      },
      {
        component: CNavItem,
        name: 'Orders',
        to: '/orders-statistics',
      },
    ],
  },
]

export default _nav
