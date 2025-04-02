import type { SidebarGroup,BreadcrumbItems } from './types'

export const adminNavigation: SidebarGroup[] = [
  {
    title: "Home",
    url: "/scion",
   
    items: [
      {
        title: "Home",
        url: "/",
        url: "/",
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

      }
    ],
  },
];

export const adminBreadcrumb:BreadcrumbItems['items'] = {
  '/':[{
    title:'Home',
    url:'/'
  }],
  '/orders':[{
    title:'My Orders',
    url:'/orders'
  }],
  '/favorites':[{
    title:'Favorites',
    url:'/favorites'
  }],
  '/categories':[{
    title:'Catogories',
    url:'/categories'
  },{
    title:'About Us',
    url:'/about'
  }],
  
}