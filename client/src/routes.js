import { ADMIN_ROUTE, BASKET_ROUTE, DISH_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE, ORDER_ROUTE } from "./utils/consts"
import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import DishPage from "./pages/DishPage"
import Shop from "./pages/Shop"
import Orders from "./pages/Orders"
import OrderPage from "./pages/OrderPage"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },

    {
        path: BASKET_ROUTE,
        Component: Basket
    },

    {
        path: ORDER_ROUTE,
        Component: Orders
    },
    {
        path: ORDER_ROUTE + '/:id',
        Component: OrderPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },

    {
        path: LOGIN_ROUTE,
        Component: Auth
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },

    {
        path: DISH_ROUTE + '/:id',
        Component: DishPage
    }
]