import { Box, Button, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axiosClient from '~/api/axiosClient';
import './Product.scss';

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

function AdminProduct() {
    const [rows, setRows] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);

    const [id, setId] = useState('');

    // Get data
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get('/product/allProducts');
                setRows(res.data);
            } catch (err) {
                console.log('fe : ' + err.message);
            }
        };
        getData();
    }, []);

    // Create product
    const handleCreate = async () => {
        try {
            const res = await axiosClient.post('/product/create', {
                code,
                name,
                description,
                image,
                price,
            });
            if (res.data.create) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    // update product
    const handleEdit = async () => {
        try {
            const res = await axiosClient.post('/product/update', {
                id,
                code,
                name,
                description,
                image,
                price,
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    // delete product
    const handleDelete = async () => {
        try {
            const res = await axiosClient.post('/product/delete', {
                id,
            });
            console.log(res.data);
            if (res.data.delete) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

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
                <Button
                    color="primary"
                    variant="contained"
                    sx={{ margin: '10px' }}
                    onClick={() => {
                        setName('');
                        setCode('');
                        setImage('');
                        setPrice(0);
                        setDescription('');
                        setOpenModalCreate(true);
                    }}
                >
                    T???o m???i
                </Button>

                <TableContainer sx={{ marginBottom: '40px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Code</TableCell>
                                <TableCell align="center">T??n s???n ph???m</TableCell>
                                <TableCell align="center">Gi??</TableCell>
                                <TableCell align="center">H??nh ?????ng</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" sortDirection="desc">
                                        {row.code}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{PriceVND(row.price)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            sx={{ marginRight: '10px' }}
                                            onClick={() => {
                                                setOpenModalEdit(true);
                                                setId(row._id);
                                                setName(row.name);
                                                setCode(row.code);
                                                setDescription(row.description);
                                                setImage(row.image);
                                                setPrice(row.price);
                                            }}
                                        >
                                            S???a
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                setOpenModalDelete(true);
                                                setId(row._id);
                                            }}
                                        >
                                            X??a
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal Create product */}
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
                            Th??m s???n ph???m m???i
                        </Typography>
                        <ValidatorForm onSubmit={handleCreate}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="M?? s???n ph???m"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p m?? s???n ph???m']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="T??n s???n ph???m"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p t??n s???n ph???m']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={price}
                                type="number"
                                label="Gi??"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p gi?? s???n ph???m']}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="M?? t???"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p m?? t???']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link ???nh"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p ?????a ch??? ???nh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Button sx={{ marginTop: '10px' }} variant="contained" fullWidth type="submit">
                                T???o m???i
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Edit Product*/}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalEdit}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            S???a th??ng tin s???n ph???m
                        </Typography>
                        <ValidatorForm onSubmit={handleEdit}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="M?? s???n ph???m"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p m?? s???n ph???m']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="T??n s???n ph???m"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p t??n s???n ph???m']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={price}
                                type="number"
                                label="Gi?? s???n ph???m"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p gi?? s???n ph???m']}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="M?? t???"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p m?? t???']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link ???nh "
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui l??ng nh???p link ???nh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <Button sx={{ marginTop: '10px' }} variant="contained" fullWidth type="submit">
                                Ch???nh s???a
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Delete */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDelete}>
                    <Box sx={styleModal}>
                        <Typography sx={{ color: '#666' }} variant="h6" component="h2">
                            B???n c?? ch???c mu???n x??a s???n ph???m n??y kh??ng?
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Button variant="contained" onClick={() => setOpenModalDelete(false)}>
                                Kh??ng
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: '10px' }}
                                onClick={handleDelete}
                            >
                                C??
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AdminProduct;
