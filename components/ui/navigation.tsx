import type { SidebarGroup,BreadcrumbItems } from './types'

export const adminNavigation: SidebarGroup[] = [
  {
    title: "Home",
    url: "/dashboard",
    items: [
      {
        title: "Home",
        url: "/dashboard",
      },
      {
        title: "My Orders",
        url: "/orders",
      },
      {
        title: "Favorites",
        url: "/favorites",
      },
      {
        title:"Catogories",
        url:"/categories"
      },
      {
        title: "About Us",
        url: "/about",

      },
      {
        title: "Add_to_cart",
        url: "/add_to_cart",
      },
    ],
  },
];

export const adminBreadcrumb:BreadcrumbItems['items'] = {
  '/':[{
    title:'Home',
    url:'/'
  }],
  '/profile':[{
    title:'Profile',
    url:'/profile'
  }],
  '/products':[{
    title:'Products',
    url:'/products'
  }],
  '/products/create':[{
    title:'Products',
    url:'/products'
  },{
    title:'Add Products',
    url:'/products/create'
  }],
  
}