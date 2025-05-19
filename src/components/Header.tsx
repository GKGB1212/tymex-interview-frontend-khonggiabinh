import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Card, CardMedia, styled } from '@mui/material';
import { motion } from 'framer-motion';
import NewArrivalCard from './NewArrivalCard';
import { fetchNewArrivals } from '../services/api';
import type { IProduct } from '../types/product';
import backgroundSvg from '../assets/images/backgrounds/yellow-bg.png';
import newArrivalImg from '../assets/svgs/backgrounds/new-arrival.svg';
import mainBackgroundImg from '../assets/images/backgrounds/main-bg.jpg'
import theDJImage from '../assets/images/the-dj.png'
import Container from './Container';
import { CaretDownIcon, GlobeIcon } from '@phosphor-icons/react';

const headerButtons = [
    'Home',
    'About us',
    'Our teams',
    'Marketplace',
    'Roadmap',
    'Whitepaper',
];

const CustomButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ isActive }) => ({
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily:'DroneRangerPro',
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: 'transparent',
    color: isActive ? 'transparent' : '#fff',
    background: isActive
        ? 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)'
        : 'none',
    backgroundClip: isActive ? 'text' : 'unset',
    WebkitBackgroundClip: isActive ? 'text' : 'unset',
    '&:hover': {
        color: 'transparent',
        background: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
    },
    '&:focus': {
        outline: 'none',
        boxShadow: 'none',
    },
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: '6px',
        left: '12px',
        width: '16px',
        height: '2px', 
        background: isActive
            ? 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)' 
            : 'transparent',
        transition: 'background 0.3s ease',
    },
    transition: 'all 0.3s ease',
}));

export default function Header() {
    const [newArrivals, setNewArrivals] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadNewArrivals = async () => {
            setLoading(true);
            try {
                const data = await fetchNewArrivals();
                setNewArrivals(data);
                setError(null);
            } catch (err) {
                setError('Failed to load new arrivals');
            } finally {
                setLoading(false);
            }
        };
        loadNewArrivals();
    }, []);

    return (
        <Box sx={{
            position: 'relative',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mainBackgroundImg})`,
        }}>
            {/* Navigation Bar */}
            <AppBar position="static" sx={{ background: 'rgba(23, 22, 26, 0.7)', boxShadow: 'none' }}>
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {/* <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Tyme NFT
                        </Typography> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, fontWeight: 'bold' }}>
                            {/* <Button color="inherit">Home</Button>
                            <Button color="inherit">About Us</Button>
                            <Button color="inherit">Our Teams</Button>
                            <Button color="inherit" sx={{ color: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)' }}>Marketplace</Button>
                            <Button color="inherit">Roadmap</Button>
                            <Button color="inherit">Whitepaper</Button> */}
                            {headerButtons.map((button) => (
                                <CustomButton
                                    key={button}
                                    isActive={button === 'Marketplace'}
                                >
                                    {button}
                                </CustomButton>
                            ))}
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Button variant="contained" sx={{ background: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)', fontWeight: 'bold', boxShadow: '0px 0px 50px 0px #BB4BFF52',px:3, textTransform:'capitalize' }}>
                                Connect Wallet
                            </Button>
                            <Button color="inherit"><GlobeIcon size={20} weight='fill' /><CaretDownIcon size={18} weight='bold' /></Button>
                        </Box>
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Button color="inherit">Menu</Button>
                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>

            {/* Banner and New Arrivals */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'center'

                }}
            >
                <Container>
                    <Box sx={{ display: 'flex' }}>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            sx={{ position: 'relative', zIndex: 1 }}
                        >
                            <Card sx={{ maxWidth: 1100, backgroundColor: 'transparent', py: 7 }}>
                                <CardMedia
                                    component="img"
                                    height="291"
                                    image={newArrivalImg}
                                    alt="new arrival"
                                />
                            </Card>
                        </motion.div>
                    </Box>

                </Container>


                {/* New Arrival Cards */}
                {loading ? (
                    <Typography sx={{ position: 'relative', zIndex: 1, color: '#fff' }}>
                        Loading...
                    </Typography>
                ) : error ? (
                    <Typography sx={{ position: 'relative', zIndex: 1, color: '#fff' }} color="error">
                        {error}
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            // alignItems:'center',
                            gap: 9,
                            flexWrap: 'wrap',
                            position: 'relative',
                            zIndex: 1,
                            backgroundImage: `url(${backgroundSvg})`,
                            width: '100%',
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            height: '300px'
                        }}
                    >
                        {newArrivals.map((product, index) => (
                            <NewArrivalCard key={product.id} product={product} index={index} />
                        ))}
                        <Box
                            sx={{
                                position: 'relative',
                                width: 470,
                            }}>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    backgroundColor: 'transparent',
                                    position: 'absolute',
                                    bottom: 0,
                                    overflow: 'visible',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={theDJImage}
                                    alt={'the dj'}
                                    sx={{
                                        width: 470,
                                        height: 'auto',

                                    }}
                                />
                            </Card>
                        </Box>

                    </Box>
                )}
            </Box>

        </Box>
    );
}