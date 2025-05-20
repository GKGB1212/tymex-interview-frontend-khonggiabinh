import { Box, Button, Container, Grid, Stack, TextField, Typography, useTheme } from '@mui/material';
import { MailboxIcon, PhoneIcon } from '@phosphor-icons/react';

export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: theme.palette.custom.neutral1, color: '#fff', py: { xs: 6, md: 8 } }}>
      <Container>
        <Box
        display={'flex'}
        flexDirection={{xs:'column', lg:'row'}}
          justifyContent={{ xs: 'space-between', md: 'space-between' }}
          textAlign={{ xs: 'center', md: 'left' }}
          gap={{ xs: 8, lg: 0 }}
        >
          <Grid size={{ xs: 12, md: 4 }} >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                mb: 2,
                fontFamily: 'DroneRangerPro',
              }}
            >
              NAVIGATION
            </Typography>
            <Grid container spacing={6}>
              {[
                ['Home', 'About us', 'Our teams'],
                ['Whitepaper', 'Marketplace', 'Roadmap'],
                ['FAQs', 'News', 'Community']
              ].map((column, idx) => (
                <Grid size={4} key={idx}>
                  <Stack spacing={1}>
                    {column.map((item) => (
                      <Typography key={item} variant="body1">
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* CONTACT US */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                mb: 2,
                fontFamily: 'DroneRangerPro',
              }}
            >
              CONTACT US
            </Typography>
            <Stack spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <PhoneIcon size={20} />
                <Typography variant="body2">01234568910</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={1}>
                <MailboxIcon size={20} />
                <Typography variant="body2">tymex-talent@tyme.com</Typography>
              </Stack>
            </Stack>
          </Grid>

          {/* SUBSCRIBE */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                letterSpacing: 1,
                mb: 2,
                fontFamily: 'DroneRangerPro',
              }}
            >
              SUBSCRIBE TO RECEIVE OUR LATEST UPDATE
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems={{ xs: 'stretch', sm: 'center' }}
            >
              <TextField
                fullWidth
                size="small"
                placeholder="Your email address"
                InputProps={{
                  sx: {
                    bgcolor: '#121212',
                    border: '1px solid #fff',
                    color: '#fff',
                    '& input': { color: '#fff' },
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{
                  background: theme.palette.custom.primaryGradient,
                  color: '#fff',
                  textTransform: 'none',
                  px: 4,
                  whiteSpace: 'nowrap',
                  width: { xs: '100%', sm: 'auto' },
                  boxShadow: '0px 0px 50px 0px #BB4BFF52',
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Grid>
        </Box>

        <Box sx={{ borderTop: '1px solid #333', mt: 6, pt: 4 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            direction={{ xs: 'column', md: 'row' }}
          >
            <Grid>
              <Typography variant="body2" textAlign={{ xs: 'center', md: 'left' }}>
                ©2023 Tyme - Edit. All Rights reserved.
              </Typography>
            </Grid>
            <Grid>
              <Stack
                direction="row"
                spacing={4}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                {['Security', 'Legal', 'Privacy'].map((item) => (
                  <Typography key={item} variant="body2">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box >
  );
}
