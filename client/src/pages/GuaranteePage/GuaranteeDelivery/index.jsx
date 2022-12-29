import { Box, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

function GuaranteeDelivery() {
    const [deliveries, setDeliveries] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/delivery/to/${localStorage.getItem('idPage')}`);
                // console.log(res.data);
                const newDeliveries = res.data.filter((delivery) => {
                    return delivery.status !== 'Giao hàng thành công';
                });
                setDeliveries(newDeliveries);
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

    const handleClickAccept = async (idGuaranteeOrder, idDelivery) => {
        // console.log(idGuaranteeOrder);

        try {
            const res = await axiosClient.put(`/delivery/updateStatus/${idDelivery}`, {
                status: 'Giao hàng thành công',
            });
            const resUpdateStatusGuarantee = await axiosClient.put(
                `/guarantee/updateStatusGuarantee/${idGuaranteeOrder}`,
                {
                    status: 'guarantee',
                },
            );
            if (res.data.update && resUpdateStatusGuarantee.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log(err.message);
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
                        {deliveries.map((delivery) => (
                            <ListItem
                                key={delivery._id}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '5px',
                                    borderBottom: '1px solid #ccc',
                                }}
                            >
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        Mã bảo hành
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        {delivery.idGuaranteeOrder}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        Vận chuyển từ
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        {delivery.nameFrom}
                                    </Typography>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        Ngày giao hàng:
                                    </Typography>
                                    <Typography sx={{ color: '#666', fontSize: '1rem' }} variant="span">
                                        {getDate(delivery.createdAt)}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'right',
                                        margin: '10px 0',
                                    }}
                                >
                                    <Button
                                        onClick={() => handleClickAccept(delivery.idGuaranteeOrder, delivery._id)}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Đã nhận được hàng
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default GuaranteeDelivery;
