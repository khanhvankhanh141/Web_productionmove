import { Box, CardActionArea, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';
import agencyImage from '~/assets/image/agencylogo.jpg';

function Agency() {
    const [agency, setAgency] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/agency/${localStorage.getItem('idPage')}`);
                setAgency(res.data.agency);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundcolor: '#fff',

                    overflowY: 'scroll',
                }}
            >
                {agency ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                            <Card sx={{ maxWidth: 750, margin: '0 20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={agencyImage}
                                        alt="Image"
                                        backgroundcolor="black"
                                    />
                                    <CardContent>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {agency.name}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {agency.address}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            Hoạt động: Thứ 2 - Thứ 7 (7h -22h)
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default Agency;
