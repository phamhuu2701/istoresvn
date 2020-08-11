/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from 'components/user/views/Index.jsx';
import Profile from 'components/user/views/examples/Profile.jsx';
import StoresManage from 'components/user/views/examples/StoresManage.jsx';
import ChangeEmail from './components/user/views/examples/ChangeEmail';
import ChangePhone from './components/user/views/examples/ChangePhone';
import ChangePassword from './components/user/views/examples/ChangePassword';
import StoresProductsManage from './components/user/views/examples/StoresProductsManage';
import BuyStoresMore from './components/user/views/examples/BuyStoresMore';

var routes = [
    // {
    //     path: "/index",
    //     name: "Trang chủ",
    //     icon: "ni ni-shop text-primary",
    //     component: Index,
    //     layout: "/user"
    // },
    {
        path: '/profile',
        name: 'Thông tin cá nhân',
        icon: 'ni ni-single-02 text-yellow',
        component: Profile,
        layout: '/user'
    },
    {
        path: '/index',
        name: 'Tin nhắn',
        icon: 'ni ni-chat-round text-primary',
        component: Index,
        layout: '/user'
    },
    {
        path: '/stores-manage',
        name: 'Quản lý cửa hàng',
        icon: 'ni ni-bullet-list-67 text-red',
        component: StoresManage,
        layout: '/user'
    },
    {
        path: '/stores-products-manage',
        name: 'Cập nhập sản phẩm',
        icon: 'ni ni-ruler-pencil text-blue',
        component: StoresProductsManage,
        layout: '/user'
    },
    {
        path: '/analytics',
        name: 'Thống kê',
        icon: 'ni ni-chart-pie-35 text-orange',
        component: Index,
        layout: '/user'
    },
    {
        path: '/more-stores',
        name: 'Mua gói cửa hàng',
        icon: 'ni ni-cart text-orange',
        component: BuyStoresMore,
        layout: '/user'
    },
    {
        path: '/change-email',
        name: 'Đổi email',
        icon: 'ni ni-email-83 text-info',
        component: ChangeEmail,
        layout: '/user-auth'
    },
    {
        path: '/change-phone',
        name: 'Đổi số điện thoại',
        icon: 'ni ni-mobile-button text-success',
        component: ChangePhone,
        layout: '/user-auth'
    },
    {
        path: '/change-password',
        name: 'Đổi mật khẩu',
        icon: 'ni ni-key-25',
        component: ChangePassword,
        layout: '/user-auth'
    }
];
export default routes;
