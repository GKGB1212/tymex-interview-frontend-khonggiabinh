import React, { type ChangeEvent } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder = 'Search' }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      variant="outlined"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MagnifyingGlass color='#89888B' />
          </InputAdornment>
        )
      }}
      sx={{
        mb: 2,
        '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            background: 'transparent',
            color: '#fff',
            height:'44px',
            '& fieldset': {
                borderColor: '#89888B',
            },
            '&:hover fieldset': {
                borderColor: '#89888B',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#89888B',
            },
        },
        '& .MuiInputBase-input': {
            color: '#89888B',
        },
    }}
    />
  );
};

export default SearchInput;
