import { MenuModal } from '../types/layout';
import AppSubMenu from './AppSubMenu';

const AppMenu = () => {
    const model: MenuModal[] = [
        {
            label: 'Dashboards',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    to: '/dashboard'
                }
            ]
        },
        { separator: true },
        {
            label: 'Hosting',
            icon: 'pi pi-th-large',
            items: [
                {
                    label: 'Web Hosting',
                    icon: 'pi pi-fw pi-comment',
                    items: [
                        {
                            label: 'Files',
                            icon: 'pi pi-fw pi-image',
                            to: '/hosting/files'
                        },
                        {
                            label: 'Emails',
                            icon: 'pi pi-fw pi-list',
                            to: '/hosting/emails'
                        },
                        {
                            label: 'Apps',
                            icon: 'pi pi-fw pi-image',
                            to: '/hosting/apps'
                        },
                        {
                            label: 'Databases',
                            icon: 'pi pi-fw pi-list',
                            to: '/hosting/databases'
                        },
                        {
                            label: 'Upgrade Plan',
                            icon: 'pi pi-fw pi-pencil',
                            to: '/hosting/upgrade-plan'
                        }
                    ]
                },
                
            ]
                
        },
        { separator: true },
        {
            label: 'Services',
            icon: 'pi pi-fw pi-star-fill',
            items: [
                {
                    label: 'SMTP Relay',
                    icon: 'pi pi-fw pi-calendar',
                    to: '/services/smtp-relay'
                },
                {
                    label: 'Authentication',
                    icon: 'pi pi-fw pi-id-card',
                    to: '/services/formlayout'
                },
                {
                    label: 'Messaging',
                    icon: 'pi pi-fw pi-comment',
                    to: '/services/messaging',
                    items: [
                        {
                            label: 'Whatsapp',
                            icon: 'pi pi-fw pi-bars',
                            to: '/services/wh'
                        },
                        {
                            label: 'Email',
                            icon: 'pi pi-fw pi-search',
                            to: '/services/textarea'
                        },
                        {
                            label: 'SMS',
                            icon: 'pi pi-fw pi-calendar',
                            to: '/services/calendar'
                        },
                        {
                            label: 'Push Notifications',
                            icon: 'pi pi-fw pi-file',
                            to: '/services/fileupload'
                        }

                    ]
                },
                {
                    label: 'Geolocation',
                    icon: 'pi pi-fw pi-map',
                    to: '/services/geolocation'
                },
                {
                    label: 'Storage',
                    icon: 'pi pi-fw pi-chart-bar',
                    to: '/services/storage'
                }
               
            ]
        },
        // { separator: true },
        // {
        //     label: 'Prime Blocks',
        //     icon: 'pi pi-fw pi-prime',
        //     items: [
        //         {
        //             label: 'Free Blocks',
        //             icon: 'pi pi-fw pi-eye',
        //             to: '/blocks'
        //         },
        //         {
        //             label: 'All Blocks',
        //             icon: 'pi pi-fw pi-globe',
        //             url: 'https://blocks.primereact.org',
        //             target: '_blank'
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'Utilities',
        //     icon: 'pi pi-fw pi-compass',
        //     items: [
        //         {
        //             label: 'PrimeIcons',
        //             icon: 'pi pi-fw pi-prime',
        //             to: '/utilities/icons'
        //         },
        //         {
        //             label: 'Colors',
        //             icon: 'pi pi-fw pi-palette',
        //             to: '/utilities/colors'
        //         },
        //         {
        //             label: 'PrimeFlex',
        //             icon: 'pi pi-fw pi-desktop',
        //             url: 'https://www.primefaces.org/primeflex/',
        //             target: '_blank'
        //         },
        //         {
        //             label: 'Figma',
        //             icon: 'pi pi-fw pi-pencil',
        //             url: 'https://www.figma.com/file/two0OGwOwHfq0sdjeK34l0/Preview-%7C-Atlantis-2022?type=design&node-id=15%3A1427&t=qiyvYNgWP234Ik5g-1',
        //             target: '_blank'
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'Pages',
        //     icon: 'pi pi-fw pi-briefcase',
        //     items: [
        //         {
        //             label: 'Landing',
        //             icon: 'pi pi-fw pi-globe',
        //             to: '/landing'
        //         },
        //         {
        //             label: 'Auth',
        //             icon: 'pi pi-fw pi-user',
        //             items: [
        //                 {
        //                     label: 'Login',
        //                     icon: 'pi pi-fw pi-sign-in',
        //                     to: '/auth/login'
        //                 },
        //                 {
        //                     label: 'Error',
        //                     icon: 'pi pi-fw pi-times-circle',
        //                     to: '/auth/error'
        //                 },
        //                 {
        //                     label: 'Access Denied',
        //                     icon: 'pi pi-fw pi-lock',
        //                     to: '/auth/access'
        //                 },
        //                 {
        //                     label: 'Register',
        //                     icon: 'pi pi-fw pi-user-plus',
        //                     to: '/auth/register'
        //                 },
        //                 {
        //                     label: 'Forgot Password',
        //                     icon: 'pi pi-fw pi-question',
        //                     to: '/auth/forgotpassword'
        //                 },
        //                 {
        //                     label: 'New Password',
        //                     icon: 'pi pi-fw pi-cog',
        //                     to: '/auth/newpassword'
        //                 },
        //                 {
        //                     label: 'Verification',
        //                     icon: 'pi pi-fw pi-envelope',
        //                     to: '/auth/verification'
        //                 },
        //                 {
        //                     label: 'Lock Screen',
        //                     icon: 'pi pi-fw pi-eye-slash',
        //                     to: '/auth/lockscreen'
        //                 }
        //             ]
        //         },

        //         {
        //             label: 'Crud',
        //             icon: 'pi pi-fw pi-pencil',
        //             to: '/pages/crud'
        //         },
        //         {
        //             label: 'Timeline',
        //             icon: 'pi pi-fw pi-calendar',
        //             to: '/pages/timeline'
        //         },
        //         {
        //             label: 'Invoice',
        //             icon: 'pi pi-fw pi-dollar',
        //             to: '/pages/invoice'
        //         },
        //         {
        //             label: 'About Us',
        //             icon: 'pi pi-fw pi-user',
        //             to: '/pages/aboutus'
        //         },
        //         {
        //             label: 'Help',
        //             icon: 'pi pi-fw pi-question-circle',
        //             to: '/pages/help'
        //         },
        //         {
        //             label: 'Not Found',
        //             icon: 'pi pi-fw pi-exclamation-circle',
        //             to: '/pages/notfound'
        //         },
        //         {
        //             label: 'Empty',
        //             icon: 'pi pi-fw pi-circle-off',
        //             to: '/pages/empty'
        //         },
        //         {
        //             label: 'FAQ',
        //             icon: 'pi pi-fw pi-question',
        //             to: '/pages/faq'
        //         },
        //         {
        //             label: 'Contact Us',
        //             icon: 'pi pi-fw pi-phone',
        //             to: '/pages/contact'
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'E-Commerce',
        //     icon: 'pi pi-fw pi-wallet',
        //     items: [
        //         {
        //             label: 'Product Overview',
        //             icon: 'pi pi-fw pi-image',
        //             to: '/ecommerce/product-overview'
        //         },
        //         {
        //             label: 'Product List',
        //             icon: 'pi pi-fw pi-list',
        //             to: '/ecommerce/product-list'
        //         },
        //         {
        //             label: 'New Product',
        //             icon: 'pi pi-fw pi-plus',
        //             to: '/ecommerce/new-product'
        //         },
        //         {
        //             label: 'Shopping Cart',
        //             icon: 'pi pi-fw pi-shopping-cart',
        //             to: '/ecommerce/shopping-cart'
        //         },
        //         {
        //             label: 'Checkout Form',
        //             icon: 'pi pi-fw pi-check-square',
        //             to: '/ecommerce/checkout-form'
        //         },
        //         {
        //             label: 'Order History',
        //             icon: 'pi pi-fw pi-history',
        //             to: '/ecommerce/order-history'
        //         },
        //         {
        //             label: 'Order Summary',
        //             icon: 'pi pi-fw pi-file',
        //             to: '/ecommerce/order-summary'
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'User Management',
        //     icon: 'pi pi-fw pi-user',
        //     items: [
        //         {
        //             label: 'List',
        //             icon: 'pi pi-fw pi-list',
        //             to: '/profile/list'
        //         },
        //         {
        //             label: 'Create',
        //             icon: 'pi pi-fw pi-plus',
        //             to: '/profile/create'
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'Hierarchy',
        //     icon: 'pi pi-fw pi-align-left',
        //     items: [
        //         {
        //             label: 'Submenu 1',
        //             icon: 'pi pi-fw pi-align-left',
        //             items: [
        //                 {
        //                     label: 'Submenu 1.1',
        //                     icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         {
        //                             label: 'Submenu 1.1.1',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         },
        //                         {
        //                             label: 'Submenu 1.1.2',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         },
        //                         {
        //                             label: 'Submenu 1.1.3',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 1.2',
        //                     icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         {
        //                             label: 'Submenu 1.2.1',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             label: 'Submenu 2',
        //             icon: 'pi pi-fw pi-align-left',
        //             items: [
        //                 {
        //                     label: 'Submenu 2.1',
        //                     icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         {
        //                             label: 'Submenu 2.1.1',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         },
        //                         {
        //                             label: 'Submenu 2.1.2',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         }
        //                     ]
        //                 },
        //                 {
        //                     label: 'Submenu 2.2',
        //                     icon: 'pi pi-fw pi-align-left',
        //                     items: [
        //                         {
        //                             label: 'Submenu 2.2.1',
        //                             icon: 'pi pi-fw pi-align-left'
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // { separator: true },
        // {
        //     label: 'Start',
        //     icon: 'pi pi-fw pi-download',
        //     items: [
        //         {
        //             label: 'Buy Now',
        //             icon: 'pi pi-fw pi-shopping-cart',
        //             url: 'https://www.primefaces.org/store'
        //         },
        //         {
        //             label: 'Documentation',
        //             icon: 'pi pi-fw pi-info-circle',
        //             to: '/documentation'
        //         }
        //     ]
        // }
    ];

    return <AppSubMenu model={model} />;
};

export default AppMenu;
