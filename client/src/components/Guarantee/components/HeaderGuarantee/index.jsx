import { Store } from '@mui/icons-material';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DrawerCompGuarantee from '../DrawerCompGuarantee';

const allTabs = ['/guarantee/delivery', '/guarantee/product', '/guarantee/statistical'];
const pages = ['Sản phẩm được gửi', 'Đang bảo hành', 'Thống kê'];

const HeaderGuarantee = () => {
    const [value, setValue] = useState('/guarantee/delivery');
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

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
            <AppBar sx={{ background: '#063970' }}>
                <Toolbar>
                    <Store
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                        onClick={() => navigate('/')}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => navigate('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            '&:hover': {
                                cursor: 'pointer',
                            },
                        }}
                    >
                        GUARANTEE
                    </Typography>
                    {isMatch ? (
                        <>
                            <DrawerCompGuarantee />
                        </>
                    ) : (
                        <>
                            <Tabs
                                sx={{ marginLeft: 'auto' }}
                                indicatorColor="secondary"
                                textColor="inherit"
                                value={value}
                                onChange={(e, value) => setValue(value)}
                            >
                                {pages.map((page, index) => (
                                    <Tab
                                        key={index}
                                        label={page}
                                        value={allTabs[index]}
                                        component={NavLink}
                                        to={allTabs[index]}
                                    />
                                ))}
                            </Tabs>
                            <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={handleClickLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};

export default HeaderGuarantee;
