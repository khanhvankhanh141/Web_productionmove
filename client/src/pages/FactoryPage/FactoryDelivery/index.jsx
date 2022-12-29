import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

function FactoryDelivery() {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/delivery/from/${localStorage.getItem('idPage')}`);
                setDeliveries(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);

    const getDate = (data) => {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return dt + '/' + month + '/' + year;
    };

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundcolor: '#fff',

                    overflowY: 'scroll',
                }}
            >
                <Box
                    sx={{
                        margin: '10px 10px',
                    }}
                >
                    <Typography sx={{ color: '#666', fontWeight: '600' }} variant="span">
                        Đang vận chuyển:
                    </Typography>

                    <List
                        sx={{
                            Width: '100%',
                        }}
                    >
                        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Tên sản phẩm</TableCell>
                                        <TableCell align="center">Số lượng</TableCell>
                                        <TableCell align="center">Vận chuyển đến</TableCell>
                                        <TableCell align="center">Ngày giao hàng:</TableCell>
                                        <TableCell align="center">Trạng thái:</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deliveries.map((delivery, index) => (
                                        <TableRow
                                            id={index}
                                            className="row"
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{delivery.nameProduct}</TableCell>
                                            <TableCell align="center">{delivery.amount}</TableCell>
                                            <TableCell align="center">{delivery.nameTo}</TableCell>
                                            <TableCell align="center"> {getDate(delivery.createdAt)}</TableCell>
                                            <TableCell sx={{ color: 'blue' }}>{delivery.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default FactoryDelivery;
