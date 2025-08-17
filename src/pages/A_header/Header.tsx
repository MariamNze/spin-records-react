import MyNavBar from "../../components/header/MyNavBar.tsx";
import {Button} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'



const Header = () => {
    return (
        <>
            <MyNavBar/>
            <Button component={RouterLink} to="/products">Produits</Button>
            <Button component={RouterLink} to="/cart">Panier</Button>
            <Button component={RouterLink} to="/admin/orders">Commandes</Button>
        </>
    );
};

export default Header;