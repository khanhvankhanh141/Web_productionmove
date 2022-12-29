import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '~/api/axiosClient';

function AdminFactory() {
    const navigate = useNavigate();
    const [factories, setFactories] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get('/factory');
                setFactories(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    return (
        <>
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
                                        <TableCell align="center">Tên Kho</TableCell>
                                        <TableCell align="center">Xem chi tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {factories.map((factory, index) => (
                                        <TableRow
                                            id={factory._id}
                                            className="row"
                                            key={factory._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{factory.name}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    onClick={() => navigate(`/admin/factory/${factory._id}`)}
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
        </>
    );
}

export default AdminFactory;
