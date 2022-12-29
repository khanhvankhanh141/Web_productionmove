import { Store } from '@mui/icons-material';
import { AppBar, Button, Tab, Tabs, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DrawerCompFactory from '../DrawerCompFactory';

const allTabs = ['/factory/storage', '/factory/import', '/factory/export', '/factory/guarantee', '/factory/delivery'];
const pages = ['Quản lý Kho', 'Nhập hàng', 'Chuyển hàng', 'Sản Phẩm lỗi', 'Vận chuyển'];

const HeadeFactory = () => {
    const [value, setValue] = useState('/factory/storage');
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
                        onClick={() => navigate('/')}
                    >
                        FACTORY
                    </Typography>
                    {isMatch ? (
                        <>
                            <DrawerCompFactory />
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

export default HeadeFactory;
