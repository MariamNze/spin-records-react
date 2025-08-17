import {Routes, Route} from "react-router";
import Home from "../pages/B_body/Home.tsx";
import ProductDetails from "../pages/B_body/ProductDetails.tsx";
import CartDetails from "../pages/B_body/CartDetails.tsx";
import Orders from "../pages/B_body/Orders.tsx";
import ProductList from "../pages/B_body/ProductList.tsx";
import Layout from "../layout/Layout.tsx";

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<CartDetails/>}/>
                <Route path="admin/orders" element={<Orders/>}/>
                <Route path="*" element={<div>Error 404</div>} />
            </Route>
        </Routes>
    );
};

export default Router;