import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const users = [
    { name: 'Tài Khoản Admin', link: '/admin/adminUsers' },
    { name: 'Tài Khoản Kho sản xuất', link: '/admin/factoryUsers' },
    { name: 'Tài Khoản Đại lý', link: '/admin/agencyUsers' },
    { name: 'Tài Khoản Bảo Hành', link: '/admin/guaranteeUsers' },
];

function AdminUser() {
    const navigate = useNavigate();

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundcolor: '#fff',
                    overflowY: 'scroll',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                    <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Tên Đại Lý</TableCell>
                                    <TableCell align="center">Xem chi tiết</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <TableRow
                                        id={index}
                                        className="row"
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell align="center">{user.name}</TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="info"
                                                onClick={() => navigate(user.link)}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </>
    );
}

export default AdminUser;
