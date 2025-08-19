import {Routes, Route} from "react-router";
import Home from "../pages/B_body/Home.tsx";
import ProductDetails from "../pages/B_body/ProductDetails.tsx";
import CartDetails from "../pages/B_body/CartDetails.tsx";
import AdminOrders from "../pages/B_body/AdminOrders.tsx";
import ProductList from "../pages/B_body/ProductList.tsx";
import Layout from "../layout/Layout.tsx";
import OrderDetails from "../pages/B_body/OrderDetails.tsx";
import CheckoutDetails from "../pages/B_body/CheckoutDetails.tsx";

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<CartDetails/>}/>
                <Route path="/checkout" element={<CheckoutDetails/>}/>
                <Route path="/orders" element={<OrderDetails/>}/>
                <Route path="admin" element={<AdminOrders/>}/>
                <Route path="*" element={<div>Error 404</div>} />
            </Route>
        </Routes>
    );
};

export default Router;