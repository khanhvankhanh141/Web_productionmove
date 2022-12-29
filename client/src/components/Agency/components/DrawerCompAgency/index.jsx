import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const pages = ['Quản lý Kho', 'Nhập hàng', 'Sản Phẩm đã bán', 'Sản Phẩm bảo hành', 'Vận chuyển'];
const allTabs = ['/agency/storage', '/agency/import', '/agency/sold', '/agency/guarantee', '/agency/delivery'];

const DrawerCompAgency = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();
    const handleClickLogout = () => {
        localStorage.setItem('role', '');
        localStorage.setItem('id', '');
        localStorage.setItem('name', '');
        navigate('/');
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

export default DrawerCompAgency;
