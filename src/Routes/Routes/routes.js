import AdminLayout from "../../layouts/AdminLayout";
import AddProduct from "../../Pages/Admin/AddProduct/AddProduct";
import ManageProducts from "../../Pages/Admin/ManageProducts/ManageProducts";
import ManageUsers from "../../Pages/Admin/ManageUsers/ManageUsers";
import UpdateProduct from "../../Pages/Admin/UpdateProduct/UpdateProduct";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders/Orders";
import Payment from "../../Pages/Orders/Payment/Payment";
import Register from "../../Pages/Register/Register";
import AdminRoute from "../AdminRoute/AdminRoute";
import ModeratorRoute from "../ModeratorRoute/ModeratorRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../layouts/Main");
const { default: About } = require("../../Pages/About/About");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: '/home', element: <Home></Home> },
            { path: '/about', element: <About></About> },
            {
                path: '/orders',
                element: <PrivateRoute><Orders></Orders></PrivateRoute>
            },
            {
                path: '/payment/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/orders/${params.id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('bazarToken')}`
                    }
                }),
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
            },
            { path: '/login', element: <Login></Login> },
            { path: '/register', element: <Register></Register> },
        ]
    },
    {
        path: '/admin',
        element: <PrivateRoute>
            <ModeratorRoute>
                <AdminLayout></AdminLayout>
            </ModeratorRoute>
        </PrivateRoute>,
        children: [
            {
                path: '/admin/manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            {
                path: '/admin/manageProducts',
                element: <ManageProducts></ManageProducts>
            },
            {
                path: '/admin/addProduct',
                element: <AdminRoute><AddProduct></AddProduct></AdminRoute>
            },
            {
                path: '/admin/updateProduct/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`, {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('bazarToken')}`
                    }
                }),
                element: <UpdateProduct></UpdateProduct>
            },
        ]
    }
])

export default router;