import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardMedia, Container } from '@mui/material';
import { motion } from 'framer-motion';
import NewArrivalCard from './NewArrivalCard';
import { fetchNewArrivals } from '../../services/api';
import type { IProduct } from '../../types/product';
import newArrivalImg from '../../assets/svgs/backgrounds/new-arrival.svg';
import backgroundYellow from '../../assets/images/backgrounds/yellow-bg.png';
import theDJImage from '../../assets/images/the-dj.png';

export default function NewArrivalSection() {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container>
                <Box sx={{ display: 'flex' }}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{ position: 'relative', zIndex: 1 }}
                    >
                        <Card sx={{ maxWidth: 1100, backgroundColor: 'transparent', py: { xs: 2, md: 5, lg: 7 }, boxShadow: 'none' }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: { xs: 180, sm: 200, md: 291 },
                                    objectFit: 'contain',
                                }}
                                image={newArrivalImg}
                                alt="new arrival"
                            />
                        </Card>
                    </motion.div>
                </Box>
            </Container>
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
                        border: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: { xs: 3, md: 5, xl: 9 },
                        flexWrap: { xs: 'wrap', md: 'nowrap' },
                        position: 'relative',
                        zIndex: 1,
                        backgroundImage: `url(${backgroundYellow})`,
                        width: '100%',
                        backgroundRepeat: 'repeat-x',
                        backgroundSize: 'auto 100%',
                        backgroundPosition: 'center',
                    }}
                >

                    {newArrivals.map((product, index) => (
                        <Box sx={{ py: { md: 4 } }}>
                            <NewArrivalCard key={product.id} product={product} index={index} />
                        </Box>

                    ))}
                    <Box sx={{
                        position: 'relative',
                        width: { xs: '100%', lg: 470 },
                        display: { xs: 'none', lg: 'block' },
                    }}>
                        <Card sx={{
                            boxShadow: 'none',
                            backgroundColor: 'transparent',
                            position: 'absolute',
                            bottom: 0,
                        }}>
                            <CardMedia
                                component="img"
                                image={theDJImage}
                                alt={'the dj'}
                                sx={{ width: 470, height: 'auto' }}
                            />
                        </Card>
                    </Box>
                </Box>
            )}
        </Box>
    );
}
