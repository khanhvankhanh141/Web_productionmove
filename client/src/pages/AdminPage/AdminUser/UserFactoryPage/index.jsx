import { Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import './UserGuaranteeDetails.scss';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

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

function UserFactoryDetails() {
    const [rows, setRows] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordX2, setPasswordX2] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');

    const [id, setId] = useState('');

    // validate custom
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    });

    // Get data
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get('/user/userFactory');
                setRows(res.data);
            } catch (err) {
                console.log('fe : ' + err.message);
            }
        };
        getData();
    }, []);

    // Create user
    const handleCreateUser = async () => {
        try {
            const res = await axiosClient.post('/user/register', {
                name,
                email,
                password,
                sdt,
                address,
                role: 'factory',
            });
            if (res.data.register) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };
    // Delete user
    const handleDeleteUser = async () => {
        try {
            const res = await axiosClient.post('/user/delete', {
                id,
            });
            if (res.data.delete) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    const handleEditUser = async () => {
        try {
            const res = await axiosClient.post('/user/update', {
                id,
                name,
                email,
                sdt,
                address,
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
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
                {/* btn new user */}
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ margin: '10px' }}
                    onClick={() => {
                        setName('');
                        setEmail('');
                        setSdt('');
                        setAddress('');
                        setOpenModalCreate(true);
                    }}
                >
                    Tạo mới
                </Button>

                <TableContainer sx={{ marginBottom: '40px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Tên</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Số điện thoại</TableCell>
                                <TableCell align="center">Địa chỉ</TableCell>
                                <TableCell align="center">Hành động</TableCell>
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
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.email}</TableCell>
                                    <TableCell align="center">{row.sdt}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            sx={{ marginRight: '10px' }}
                                            color="warning"
                                            onClick={() => {
                                                setOpenModalEdit(true);
                                                setId(row._id);
                                                setName(row.name);
                                                setEmail(row.email);
                                                setAddress(row.address);
                                                setSdt(row.sdt);
                                            }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => {
                                                setOpenModalDelete(true);
                                                setId(row._id);
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal Create user admin */}
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
                            Tạo tài khoản kho sản xuất
                        </Typography>
                        <ValidatorForm onSubmit={handleCreateUser}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên người dùng']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={email}
                                label="Email"
                                variant="standard"
                                color="primary"
                                validators={['required', 'isEmail']}
                                errorMessages={['Vui lòng nhập email', 'Email không hợp lệ']}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={password}
                                label="Mật khẩu"
                                type="password"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mật khẩu']}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={passwordX2}
                                label="Xác nhận mật khẩu"
                                type="password"
                                variant="standard"
                                color="primary"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Nhập lại mật khẩu không chính xác', 'Vui lòng nhập mật khẩu']}
                                onChange={(e) => setPasswordX2(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={sdt}
                                label="SDT"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập số điện thoại']}
                                onChange={(e) => setSdt(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={address}
                                label="Địa chỉ"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ']}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Button sx={{ marginTop: '10px' }} variant="contained" fullWidth type="submit">
                                Tạo mới
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Edit */}
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
                            Sửa thông tin tài khoản
                        </Typography>
                        <ValidatorForm onSubmit={handleEditUser}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên người dùng']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={email}
                                label="Email"
                                variant="standard"
                                color="primary"
                                validators={['required', 'isEmail']}
                                errorMessages={['Vui lòng nhập email', 'Email không hợp lệ']}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={sdt}
                                label="SDT"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập số điện thoại']}
                                onChange={(e) => setSdt(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={address}
                                label="Địa chỉ"
                                variant="standard"
                                color="primary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ']}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Button sx={{ marginTop: '10px' }} variant="contained" fullWidth type="submit">
                                Chỉnh sửa
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
                            Bạn có chắc chắn muốn xóa tài khoản này không?
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
                                Không
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: '10px' }}
                                onClick={handleDeleteUser}
                            >
                                Xóa
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default UserFactoryDetails;
