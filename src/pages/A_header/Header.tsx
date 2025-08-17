import MyNavBar from "../components/header/MyNavBar";
import {Button} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom'



const Header = () => {
    return (
        <>
            <MyNavBar/>
            <Button component={RouterLink} to="/products">Produits</Button>
            <Button component={RouterLink} to="/cart">Panier</Button>
            <Button component={RouterLink} to="/orders">Commandes</Button>
        </>
    );
};

export default Header;