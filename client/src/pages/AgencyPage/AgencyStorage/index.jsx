import { Backdrop, Box, Button, CardActionArea, CardContent, CardMedia, Fade, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
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

function AgencyStorage() {
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState({});
    const [storage, setStorage] = useState([]);
    const [openModalProduct, setOpenModalProduct] = useState(false);

    const getAmount = (id) => {
        var result = storage.find((item) => {
            return item.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/agency/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setRows(res.data.products);
                setStorage(res.data.agency.storage);
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
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã Sản Phẩm</TableCell>
                                <TableCell align="center">Ảnh</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Giá</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
                                <TableCell align="center">Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row, index) => (
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
                                    <TableCell align="center">
                                        <img src={row.image} alt={row.image} style={{ width: 100, height: 120 }} />
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{PriceVND(row.price)}</TableCell>
                                    <TableCell align="center">{getAmount(row._id)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                setOpenModalProduct(true);
                                                setSelected(row);
                                            }}
                                            variant="contained"
                                            color="primary"
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
            {/* Modal product */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalProduct}
                onClose={() => setOpenModalProduct(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalProduct}>
                    <Box sx={styleModal}>
                        <CardActionArea sx={{ display: 'flex' }}>
                            <CardMedia component="img" height="250" image={selected?.image} alt="green iguana" />
                            <CardContent>
                                <Typography
                                    sx={{ color: '#666', fontSize: '1.2rem', marginBottom: '10px' }}
                                    variant="h5"
                                    component="div"
                                >
                                    Mã sản phẩm: {selected?.code}
                                </Typography>
                                <Typography
                                    sx={{ color: '#666', fontSize: '1.2rem', marginBottom: '10px' }}
                                    variant="h5"
                                    component="div"
                                >
                                    Tên sản phẩm: {selected?.name}
                                </Typography>
                                <Typography
                                    sx={{ color: '#0e78fb', fontSize: '1rem', marginBottom: '10px' }}
                                    variant="h5"
                                    component="div"
                                >
                                    Giá : {PriceVND(selected?.price)} VND
                                </Typography>
                                <Typography
                                    sx={{ color: '#666', fontSize: '1rem', marginBottom: '10px' }}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Mô tả: {selected?.description}
                                </Typography>
                                <Typography
                                    sx={{ color: 'red', fontSize: '1rem' }}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Bảo hành: 1 năm
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AgencyStorage;
