import {Routes, Route} from "react-router";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import CartDetails from "../pages/CartDetails";
import Admin from "../pages/Admin";
import ProductList from "../pages/ProductList.tsx";
import Layout from "../layout/Layout.tsx";

const Router = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element={<ProductList/>}/>
                <Route path="/products/:id" element={<ProductDetails/>}/>
                <Route path="/cart" element={<CartDetails/>}/>
                <Route path="/admin" element={<Admin/>}/>
            </Route>
        </Routes>
    );
};

export default Router;