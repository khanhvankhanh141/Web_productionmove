import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';

const pages = ['Sản phẩm được gửi', 'Đang bảo hành', 'Thống kê'];
const allTabs = ['/guarantee/delivery', '/guarantee/product', '/guarantee/statistical'];

const DrawerCompGuarantee = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const handleClickLogout = () => {
        localStorage.setItem('role', '');
        localStorage.setItem('id', '');
        localStorage.setItem('name', '');
        // navigate('/');
        window.location.reload();
    };
    return (
        <React.Fragment>
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List>
                    {pages.map((page, index) => (
                        <NavLink to={allTabs[index]} className="link">
                            <ListItemButton key={index}>
                                <ListItemIcon>
                                    <ListItemText>{page}</ListItemText>
                                </ListItemIcon>
                            </ListItemButton>
                        </NavLink>
                    ))}
                    <ListItemButton onClick={handleClickLogout}>
                        <ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItemIcon>
                    </ListItemButton>
                </List>
            </Drawer>
            <IconButton sx={{ color: 'white', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon color="white" />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerCompGuarantee;
