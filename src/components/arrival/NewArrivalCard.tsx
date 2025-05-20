import { Card, CardMedia, Typography, Box, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import type { IProduct } from '../../types/product';
import newArrivalBg from '../../assets/images/backgrounds/new-arrival-bg.png';
import character1 from '../../assets/images/characters/character1.png';
import character2 from '../../assets/images/characters/character2.png';
import character3 from '../../assets/images/characters/character3.png';
import character4 from '../../assets/images/characters/character4.png';
import character5 from '../../assets/images/characters/character5.png';

interface NewArrivalCardProps {
    product: IProduct;
    index: number;
}


const characterImages = [character1, character2, character3, character4, character5];

export default function NewArrivalCard({ product, index }: NewArrivalCardProps) {
    const theme = useTheme();
    const imageIndex = Math.floor((product.imageId - 1) / 4) % 5;
    const imageSrc = characterImages[imageIndex];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Box sx={{
                position: 'relative',
                maxWidth: 202,
                    aspectRatio: '202 / 224'
            }}>

                <Box sx={{
                    display: 'flex', alignItems: 'end', width: '100%',
                    maxWidth: 200,
                    aspectRatio: '25 / 21',
                }}>
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: 200, // hoặc dùng responsive như { xs: 160, sm: 180, md: 200 }
                            aspectRatio: '5 / 3',
                            position: 'relative',
                        }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${newArrivalBg})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '1px solid',
                                borderColor: theme.palette.custom.secondary,
                                borderRadius: 0,
                                overflow: 'visible',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'end',
                                boxShadow: '-12px 12px 0px 0px #101010',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={imageSrc}
                                alt={product.title}
                                sx={{
                                    width: { xs: 140, sm: 160, md: 180, lg: 200 },
                                    height: { xs: 120, sm: 140, md: 160, lg: 168 },
                                    objectFit: 'contain',
                                }}
                            />

                        </Card>
                    </Box>
                </Box>
                <Typography
                    variant="body2"
                    sx={{
                        fontFamily: 'DroneRangerPro',
                        fontSize: { xs: '14px', sm: '16px', md: '18px' },
                        textAlign: 'center',
                        pt: { xs: 2, sm: 3, md: 4 },
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        color: '#000',
                        zIndex: 3,
                    }}
                >
                    {product.title}
                </Typography>
            </Box>
        </motion.div>
    );
}
