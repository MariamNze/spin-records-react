import React from 'react';
import {Box} from "@mui/material";

type PagesProps = {
    children: React.ReactNode;
    title: string;
}

const Pages = ({children, title} : PagesProps) => {
    return (
        <Box ml="110px" mt="64px">
            <title>{title}</title>
            {children}
        </Box>
    );
};

export default Pages;