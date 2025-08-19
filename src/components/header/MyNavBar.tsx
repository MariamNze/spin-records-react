import {Box, AppBar, Toolbar, Typography, Button, IconButton, Stack} from '@mui/material';
import {ShoppingCart} from '@mui/icons-material';
import {Link as RouterLink} from "react-router-dom";

const MyNavBar = () => {

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{gap: 2}}>
                    <Typography
                        variant="h6" sx={{flexGrow: 1}}
                        color="inherit"
                        style={{textDecoration: 'none'}}
                        component={RouterLink} to="/"
                    >
                        Spin Records
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button color="inherit" component={RouterLink} to="/products">Produits</Button>
                        <Button color="inherit" component={RouterLink} to="/orders">Commandes</Button>
                        <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
                        <IconButton color="inherit" component={RouterLink} to="/cart">
                            <ShoppingCart/>
                        </IconButton>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MyNavBar;