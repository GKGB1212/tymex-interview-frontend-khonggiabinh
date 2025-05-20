import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Container,
    Drawer,
    IconButton,
    List,
    ListItem,
} from '@mui/material';
import { GlobeIcon, CaretDownIcon, ListIcon } from '@phosphor-icons/react';
import { styled, useTheme } from '@mui/material/styles';
import { useState } from 'react';

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
})<{ isActive: boolean }>(({ isActive, theme }) => ({
    textTransform: 'uppercase',
    fontSize: 16,
    fontFamily: 'DroneRangerPro',
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: 'transparent',
    color: isActive ? 'transparent' : '#fff',
    background: isActive
        ? theme.palette.custom.primaryGradient
        : 'none',
    backgroundClip: isActive ? 'text' : 'unset',
    WebkitBackgroundClip: isActive ? 'text' : 'unset',
    '&:hover': {
        color: 'transparent',
        background: theme.palette.custom.primaryGradient,
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
            ? theme.palette.custom.primaryGradient
            : 'transparent',
        transition: 'background 0.3s ease',
    },
    transition: 'all 0.3s ease',
}));

export default function HeaderBar() {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <AppBar position="static" sx={{ background: 'rgba(23, 22, 26, 0.7)', boxShadow: 'none' }}>
                <Container>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {/* Menu for large screen */}
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 5 }}>
                            {headerButtons.map((button) => (
                                <CustomButton
                                    key={button}
                                    isActive={button === 'Marketplace'}
                                >
                                    {button}
                                </CustomButton>
                            ))}
                        </Box>
                        <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 2 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    background: theme.palette.custom.primaryGradient,
                                    fontWeight: 'bold',
                                    boxShadow: '0px 0px 50px 0px #BB4BFF52',
                                    px: 3,
                                    textTransform: 'capitalize',
                                }}
                            >
                                Connect Wallet
                            </Button>
                            <Button color="inherit">
                                <GlobeIcon size={20} weight="fill" />
                                <CaretDownIcon size={18} weight="bold" />
                            </Button>
                        </Box>

                        <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                            <IconButton onClick={toggleDrawer} color="inherit">
                                <ListIcon size={24}/>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: { background: '#17161A', color: '#fff', width: 250 }
                }}
            >
                <Box sx={{ p: 2 }}>
                    <List>
                        {headerButtons.map((text) => (
                            <ListItem key={text} disablePadding>
                                <CustomButton
                                    key={text}
                                    isActive={text === 'Marketplace'}
                                >
                                    {text}
                                </CustomButton>
                            </ListItem>
                        ))}
                    </List>
                    <Box mt={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                background: theme.palette.custom.primaryGradient,
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                mb: 1,
                            }}
                        >
                            Connect Wallet
                        </Button>
                        <Button fullWidth color="inherit" startIcon={<GlobeIcon size={20} weight="fill" />} endIcon={<CaretDownIcon size={18} weight="bold" />}>
                            Language
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}
