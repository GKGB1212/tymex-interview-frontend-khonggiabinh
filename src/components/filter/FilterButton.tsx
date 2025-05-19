import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { XCircleIcon } from '@phosphor-icons/react';

interface FilterButtonsProps {
  onReset: () => void;
  onSearch: () => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onReset, onSearch }) => {
  const theme = useTheme();

  return (
    <Box display="flex" mt={2} gap={2}>
      <Button
        onClick={onReset}
        disableRipple
        sx={{
          color: 'white',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:focus, &:active, &:hover': {
            outline: 'none',
            boxShadow: 'none',
            border: 'none',
            background: 'transparent',
          },
        }}
      >
        <XCircleIcon weight="fill" color={theme.palette.custom.secondary} size={24} />
        Reset filter
      </Button>

      <Button
        variant="contained"
        onClick={onSearch}
        sx={{
          fontWeight: 'bold',
          px: 5,
          py: 1,
          background: theme.palette.custom.primaryGradient,
          backgroundSize: '200%',
          boxShadow: '0px 0px 50px 0px #BB4BFF52',
          backgroundPosition: 'left',
          '&:hover': {
            backgroundPosition: 'right',
          },
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default FilterButtons;
