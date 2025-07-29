import React from 'react'


// wait
const Wait = React.lazy(() => import('./views/Wait'))

// suggest-products
const SuggestProducts = React.lazy(() => import('./views/suggestion/suggestproducts'))



// Categories
const Categories = React.lazy(() => import('./views/category/categories'))
const AddCategory = React.lazy(() => import('./views/category/addCategory'))
const UpdateCategory = React.lazy(() => import('./views/category/updateCategory'))
// SubCategories
const SubCategories = React.lazy(() => import('./views/subcategory/subcategories'))
const AddSubCategory = React.lazy(() => import('./views/subcategory/addSubCategory'))
const UpdateSubCategory = React.lazy(() => import('./views/subcategory/updateSubCategory'))

// product
const Products = React.lazy(() => import('./views/products/products'))
const AddProduct = React.lazy(() => import('./views/products/addProduct'))
const UpdateProduct = React.lazy(() => import('./views/products/updateProduct'))

// Shipping
const Shipping = React.lazy(() => import('./views/shipping/shipping'))
const AddShipping = React.lazy(() => import('./views/shipping/addShipping'))
const UpdateShipping = React.lazy(() => import('./views/shipping/updateShipping'))


// Admins
const Admins = React.lazy(() => import('./views/users/admins/admins'))
const AddAdmin = React.lazy(() => import('./views/users/admins/addAdmin'))
const UpdateAdmin = React.lazy(() => import('./views/users/admins/updateAdmin'))


// Vendors
const Vendors = React.lazy(() => import('./views/users/vendors/vendors'))
const AddVendor = React.lazy(() => import('./views/users/vendors/addVendor'))
const UpdateVendor = React.lazy(() => import('./views/users/vendors/updateVendor'))


// Vendors
const Customers = React.lazy(() => import('./views/users/customers/customers'))




// orders
const Orders = React.lazy(() => import('./views/orders/orders'))

// statistics
const UsersStatistic = React.lazy(() => import('./views/statistics/users'))
const ProductsStatistic = React.lazy(() => import('./views/statistics/products'))
const OrdersStatistic = React.lazy(() => import('./views/statistics/orders'))






const routes = [
  { path: '/', exact: true, name: 'Home' },
  
  { path: '/suggest-products', name: 'SuggestProducts', element: SuggestProducts },


  { path: '/categories', name: 'categories', element: Categories },
  { path: '/addCategory', name: 'Add category', element: AddCategory },
  { path: '/updateCategory', name: 'Update category', element: UpdateCategory },
  
  { path: '/subcategories', name: 'categories', element: SubCategories },
  { path: '/addSubCategory', name: 'Add category', element: AddSubCategory },
  { path: '/updateSubCategory', name: 'Update category', element: UpdateSubCategory },

  { path: '/products', name: 'products', element: Products },
  { path: '/addProduct', name: 'Add product', element: AddProduct },
  { path: '/updateProduct', name: 'Update product', element: UpdateProduct },

  
  { path: '/shipping', name: 'Shipping', element: Shipping },
  { path: '/addShipping', name: 'Add Shipping', element: AddShipping },
  { path: '/updateShipping', name: 'Update Shipping', element: UpdateShipping },

  
  { path: '/admins', name: 'Admins', element: Admins },
  { path: '/addAdmin', name: 'Add Admin', element: AddAdmin },
  { path: '/updateAdmin', name: 'Update Admin', element: UpdateAdmin },

  
  { path: '/vendors', name: 'Vendors', element: Vendors },
  { path: '/addVendor', name: 'Add Vendor', element: AddVendor },
  { path: '/updateVendor', name: 'Update Vendor', element: UpdateVendor },

  { path: '/customers', name: 'Customers', element: Customers },


 
  { path: '/orders', name: 'Orders', element: Orders },
 
  { path: '/users-statistics', name: 'UsersStatistic', element: UsersStatistic },
  { path: '/products-statistics', name: 'ProductsStatistic', element: ProductsStatistic },
  { path: '/orders-statistics', name: 'OrdersStatistic', element: OrdersStatistic },
  
  { path: '/wait', name: 'Wait', element: Wait },
  
  
]

export default routes
