import AdminLayout from "../../layouts/AdminLayout";
import AddProduct from "../../Pages/Admin/AddProduct/AddProduct";
import ManageProducts from "../../Pages/Admin/ManageProducts/ManageProducts";
import ManageUsers from "../../Pages/Admin/ManageUsers/ManageUsers";
import UpdateProduct from "../../Pages/Admin/UpdateProduct/UpdateProduct";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";

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
            { path: '/login', element: <Login></Login> },
            { path: '/register', element: <Register></Register> },
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout></AdminLayout>,
        children: [
            {
                path: '/admin/manageUsers',
                element: <ManageUsers></ManageUsers>
            },
            { path: '/admin/manageProducts', element: <ManageProducts></ManageProducts> },
            { path: '/admin/addProduct', element: <AddProduct></AddProduct> },
            {
                path: '/admin/updateProduct/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/products/${params.id}`),
                element: <UpdateProduct></UpdateProduct>
            },
        ]
    }
])

export default router;