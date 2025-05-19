import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  type SelectChangeEvent,
  styled,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownFilterProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (event: SelectChangeEvent) => void;
}

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: theme.palette.custom?.neutral2 ?? '#ccc',
  height: 44,
  borderRadius: 4,
  color: '#fff',
  '& .MuiSelect-icon': {
    color: '#ccc',
  },
  '& fieldset': {
    border: 'none',
  },
}));

const CustomLabel = styled(Typography)(({ theme }) => ({
  color: '#89888B',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginBottom: theme.spacing(1),
  fontSize: 16,
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
}));

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        mb: 2,
        minWidth: isMobile ? '100%' : 240,
      }}
    >
      <CustomLabel>{label}</CustomLabel>
      <CustomSelect
        id={`${label.toLowerCase().replace(/\s+/g, '-')}-select`}
        value={value}
        onChange={onChange}
        displayEmpty
        size="small"
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default DropdownFilter;
