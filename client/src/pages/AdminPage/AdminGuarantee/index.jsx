import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminGuarantee() {
    const navigate = useNavigate();
    const [guarantee, setGuarantee] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/guarantee');
                setGuarantee(res.data);
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
                        backgroundColor: '#fff',
                        overflowY: 'scroll',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Tên Trung Tâm Bảo Hành</TableCell>
                                        <TableCell align="center">Xem chi tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {guarantee.map((g, index) => (
                                        <TableRow
                                            id={g._id}
                                            className="row"
                                            key={g._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{g.name}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="info"
                                                    onClick={() => navigate(`/admin/guarantee/${g._id}`)}
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

export default AdminGuarantee;
