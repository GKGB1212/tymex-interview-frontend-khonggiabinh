import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { MailboxIcon, PhoneIcon } from '@phosphor-icons/react';
import Container from './Container';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#17161A', color: '#fff', py: { xs: 6, md: 8 } }}>
      <Container>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems="start"
          textAlign={{ xs: 'center', md: 'left' }}
        >
          {/* NAVIGATION */}
          <Grid item xs={12} md={4}>
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
                <Grid item xs={4} key={idx}>
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
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
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
                  background: 'linear-gradient(91.47deg, #DA458F -6%, #DA34DD 113.05%)',
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
        </Grid>

        <Box sx={{ borderTop: '1px solid #333', mt: 6, pt: 4 }}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            direction={{ xs: 'column', md: 'row' }}
          >
            <Grid item>
              <Typography variant="body2" textAlign={{ xs: 'center', md: 'left' }}>
                ©2023 Tyme - Edit. All Rights reserved.
              </Typography>
            </Grid>
            <Grid item>
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
    </Box>
  );
}
