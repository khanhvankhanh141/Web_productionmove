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

function FactoryExport() {
    // data call api
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const [agencies, setAgencies] = useState([]);
    const [factory, setFactory] = useState();

    // input delivery
    const [openModal, setOpenModal] = useState(false);
    const [idAgencyExport, setIdAgencyExport] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [amountExport, setAmountExport] = useState(0);

    const getAmount = (id) => {
        var result = storage.find((product) => {
            return product.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/factory/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setAgencies(res.data.agencies);
                setRows(res.data.products);
                setStorage(res.data.factory.storage);
                setFactory(res.data.factory);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const handleClickExport = async () => {
        const rest = storage.filter((item) => {
            return item.id !== idProduct;
        });
        var amount = getAmount(idProduct) - Number(amountExport);

        const agencyName = agencies.find((item) => {
            return item._id === idAgencyExport;
        });

        if (amount <= 0 || Number(amountExport) <= 0) {
            return;
        }

        try {
            await axiosClient.post('/factory/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: idProduct, amount: amount }, ...rest],
            });
            const res2 = await axiosClient.post('/delivery/createDeliveryByFactory', {
                from: localStorage.getItem('idPage'),
                nameFrom: factory.name,
                to: idAgencyExport,
                nameTo: agencyName.name,
                idProduct: idProduct,
                amount: amountExport,
                status: 'Đang giao hàng',
            });
            if (res2.data.create) {
                window.location.reload();
                alert(res2.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
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
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã Sản Phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center"></TableCell>
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
                                        {row.code}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{getAmount(row._id)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setIdProduct(row._id);
                                            }}
                                        >
                                            Chuyển hàng
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal export amount product */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nhập thông tin vận chuyển
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Đại lý</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idAgencyExport}
                                label="Đại lý"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdAgencyExport(e.target.value);
                                }}
                            >
                                {agencies.map((agency) => {
                                    return (
                                        <MenuItem key={agency._id} value={agency._id}>
                                            {agency.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        {rows.map((row) =>
                            row._id === idProduct ? (
                                <TextField
                                    sx={{ margin: '15px 0' }}
                                    label="Mã sản phẩm"
                                    variant="standard"
                                    fullWidth
                                    type="text"
                                    value={row.code}
                                    disabled={true}
                                />
                            ) : (
                                <></>
                            ),
                        )}
                        <TextField
                            sx={{ margin: '15px 0' }}
                            label="Số lượng"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={amountExport}
                            onChange={(e) => setAmountExport(e.target.value)}
                        />
                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleClickExport}
                        >
                            Giao hàng
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default FactoryExport;
