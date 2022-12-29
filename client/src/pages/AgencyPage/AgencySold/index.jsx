import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axiosClient from '~/api/axiosClient';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 3,
};

function AgencySold() {
    const [rows, setRows] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [nameAgency, setNameAgency] = useState('');
    const [nameCustomer, setNameCustomer] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');
    const [codeProduct, setCodeProduct] = useState('');
    const [price, setPrice] = useState(0);

    const [openModalGuarantee, setOpenModalGuarantee] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/agency/order/${localStorage.getItem('idPage')}`);
                setRows(res.data.orders);
                setNameAgency(res.data.nameAgency);
                setListProducts(res.data.products);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const PriceVND = (price) => {
        const priceVND = Intl.NumberFormat('en-US').format;
        return priceVND(price);
    };

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

    const compareDate = (data) => {
        let date = new Date(data);
        let today = new Date();
        let ms1 = date.getTime();
        let ms2 = today.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const handleCreateOrder = async () => {
        try {
            const res = await axiosClient.post('/agency/createOder', {
                idAgency: localStorage.getItem('idPage'),
                nameAgency: nameAgency,
                nameCustomer: nameCustomer,
                sdt: sdt,
                address: address,
                price: Number(price),
                idProduct: codeProduct,
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleGuaranteeOrder = async () => {
        try {
            const res = await axiosClient.post('/agency/createGuaranteeOrder', {
                idOrder: idOrder,
                error: error,
                idAgency: localStorage.getItem('idPage'),
                status: 'agency',
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
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
                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Button
                        sx={{ marginLeft: '10px' }}
                        onClick={() => setOpenModalCreate(true)}
                        variant="contained"
                        color="primary"
                    >
                        Tạo hóa đơn
                    </Button>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">ID khách hàng</TableCell>
                                <TableCell align="center">Giá</TableCell>
                                <TableCell align="center">Thời gian</TableCell>
                                <TableCell align="center">Bảo hành</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center" component="th" scope="row" sortDirection="desc">
                                        {row.nameProduct}
                                    </TableCell>
                                    <TableCell align="center">{row.idCustomer}</TableCell>
                                    <TableCell align="center">{PriceVND(row.price)}</TableCell>
                                    <TableCell align="center">{getDate(row.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        {compareDate(row.createdAt) > 365 ? (
                                            <Button onClick={() => {}} variant="outlined" disabled color="secondary">
                                                Hết bảo hành
                                            </Button>
                                        ) : (
                                            <>
                                                {row.status === 'not guarantee' ? (
                                                    <Button
                                                        onClick={() => {
                                                            setIdOrder(row._id);
                                                            setOpenModalGuarantee(true);
                                                        }}
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Bảo hành
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => {}} disabled variant="contained">
                                                        Đang bảo hành
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal create order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Tạo hóa đơn
                        </Typography>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên Đại lý"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameAgency}
                            disabled={true}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên khách hàng"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameCustomer}
                            onChange={(e) => setNameCustomer(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Số điện thoại"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Địa chỉ"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">Mã Sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={codeProduct}
                                label="Mã sản phẩm"
                                onChange={(e) => {
                                    setCodeProduct(e.target.value);
                                    const pdt = listProducts.find((p) => p._id === e.target.value);
                                    setPrice(pdt.price);
                                }}
                            >
                                {listProducts.map((product) => {
                                    return (
                                        <MenuItem key={product._id} value={product._id}>
                                            {product.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Giá sản phẩm"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={price}
                            disabled={true}
                        />

                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleCreateOrder}
                        >
                            Xác nhận
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal guarantee order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalGuarantee}
                onClose={() => setOpenModalGuarantee(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalGuarantee}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển vào danh sách bảo hành
                        </Typography>

                        <TextField
                            sx={{ marginTop: '15px' }}
                            label="Lỗi sản phẩm"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="error"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalGuarantee(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleGuaranteeOrder}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AgencySold;
