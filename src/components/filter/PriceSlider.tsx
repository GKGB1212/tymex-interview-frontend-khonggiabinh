import React from 'react';
import { Slider, Box, Typography, styled, useTheme } from '@mui/material';

interface PriceSliderProps {
  value: number[];
  onChange: (event: Event, newValue: number | number[]) => void;
  min?: number;
  max?: number;
  label?: string;
}
const NeonSlider = styled(Slider)({
  color: '#e600ff',
  height: 8,
  padding: '15px 0',
  '& .MuiSlider-track': {
    border: 'none',
    background: 'linear-gradient(90deg, #ff00ff, #aa00ff)',
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: '#888',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#ff00ff',
    boxShadow: '0 0 20px #ff00ff',
    border: '3px solid white',
    '&:hover': {
      boxShadow: '0 0 30px #ff00ff',
    },
    '&:focus, &:active': {
      boxShadow: '0 0 40px #ff00ff',
    },
  },
  '& .MuiSlider-valueLabel': {
    display: 'none',
  }
});
const PriceSlider: React.FC<PriceSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 300,
  label = 'PRICE',
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ mb: 2 }}>
      <Typography gutterBottom sx={{fontWeight:600}}>
        {label}
      </Typography>
      <NeonSlider
        value={value}
        onChange={onChange}
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          color: '#ff4081',
          '& .MuiSlider-thumb': {
            backgroundImage: 'radial-gradient(50% 50% at 50% 50%, #ffffff 0%, #ff54ee85 50%, #000000b7 65%)',
            boxShadow: '0 0 16px 6px rgba(218, 64, 163, 0.3)',
            border: '1px solid #fff',
            width: 24,
            height: 24,
          },
          '& .MuiSlider-track': { backgroundColor: 'linear-gradient(91.27deg, rgba(218, 69, 143, 0) 0.55%, #DA41A2 24.03%, #DA37CE 83.19%, rgba(218, 52, 221, 0) 102.8%)' },
          '& .MuiSlider-rail': { background: theme.palette.custom.neutral2, opacity: 1, borderRadius: '2px' },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography>{value[0]} ETH</Typography>
        <Box sx={{ color: '#fff', px: 1, py: 0.5, borderRadius: 1 }}>
          {value[1]} ETH
        </Box>
      </Box>
    </Box>
  );
};

export default PriceSlider;
