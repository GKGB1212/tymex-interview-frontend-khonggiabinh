import { Box, Container } from '@mui/material';
import CategoryBar from '../components/layout/CategoryBar';
import ProductGrid from '../components/product/ProductGrid';
import Footer from '../components/layout/Footer';
import mainBackgroundImg from '../assets/images/backgrounds/main-bg.jpg';
import backgroundImg from '../assets/images/backgrounds/background.png';
import FilterComponent from '../components/filter';
import '../styles/font.css';
import HeaderBar from '../components/layout/HeaderBar';
import NewArrivalSection from '../components/arrival/NewArrivalSection';

export default function Home() {

    return (
        <Box
            sx={{
                fontFamily: 'DroneRangerPro',
                minHeight: '100vh',
                width: '100vw',
                backgroundImage: `url(${backgroundImg})`,
                backgroundRepeat: 'repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflowX: 'hidden',
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${mainBackgroundImg})`
                }}
            >
                <HeaderBar />
                <NewArrivalSection />
            </Box>

            <Container maxWidth="lg" sx={{ mt: { xs: 8, md: '140px' }, mb: 8 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: { xs: 'column', lg: 'row' },
                        gap: { xs: 4, md: 4 },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: '100%', lg: '25%' },
                            mr: { md: 2 },
                            mb: { xs: 4, md: 0 },
                        }}
                    >
                        <FilterComponent />
                    </Box>

                    <Box sx={{ width: { xs: '100%', lg: '70%' } }}>
                        <CategoryBar />
                        <ProductGrid />
                    </Box>
                </Box>
            </Container>

            <div className="footer-wave" />
            <Footer />
        </Box>
    );
}
