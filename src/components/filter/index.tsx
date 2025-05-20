import React, { useState, type ChangeEvent } from 'react';
import { Box } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import SearchInput from './SearchInput';
import PriceSlider from './PriceSlider';
import DropdownFilter from './DropdownFilter';
import FilterButtons from './FilterButton';
import { useDebouncedCallback } from '../../hooks';


const tierOptions = [
  { value: 'Basic', label: 'Basic' },
  { value: 'Deluxe', label: 'Deluxe' },
  { value: 'Premium', label: 'Premium' },
];
const themeOptions = [
  { value: 'Halloween', label: 'Halloween' },
  { value: 'Colorful', label: 'Colorful' },
  { value: 'Light', label: 'Light' },
  { value: 'Dark', label: 'Dark' }
];
const timeOptions = [
  { value: 'asc', label: 'Lastest' },
  { value: 'desc', label: 'Oldest' },
];
const priceSortOptions = [
  { value: 'asc', label: 'Low to high' },
  { value: 'desc', label: 'High to low' },
];

const FilterComponent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    searchTerm: searchParams.get('search') || '',
    tier: searchParams.get('tier') || '',
    theme: searchParams.get('theme') || '',
    time: searchParams.get('time') || '',
    priceSort: searchParams.get('priceSort') || '',
    priceRange: [
      Number(searchParams.get('price_gte')) || 0,
      Number(searchParams.get('price_lte')) || 100,
    ],
  });


  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
  
      if (key === 'time' && value) {
        newFilters.priceSort = '';
      }
  
      if (key === 'priceSort' && value) {
        newFilters.time = '';
      }
  
      const newParams = new URLSearchParams(searchParams.toString());
  
      if (value) {
        newParams.set(key === 'searchTerm' ? 'search' : key, value);
      } else {
        newParams.delete(key === 'searchTerm' ? 'search' : key);
      }
  
      if (key === 'time') {
        newParams.delete('priceSort');
      } else if (key === 'priceSort') {
        newParams.delete('time');
      }
  
      newParams.set('page', '1');
      setSearchParams(newParams);
  
      return newFilters;
    });
  };

  useDebouncedCallback(filters.searchTerm, (value) => {
    if (value.length > 0 || (value.length === 0 && (searchParams.get('search') || '')?.length))
      setSearchParams((prev) => {
        const currentParams = new URLSearchParams(prev);
        currentParams.set('search', value);
        currentParams.set('page', '1');
        return currentParams;
      });
  }, 300);
  const applyFilters = () => {
    const params: any = {};
    if (filters.tier) params.tier = filters.tier;
    if (filters.theme) params.theme = filters.theme;
    if (filters.time) params.time = filters.time;
    if (filters.priceSort) params.priceSort = filters.priceSort;
    if (filters.priceRange[0] >= 0) params.price_gte = filters.priceRange[0];
    if (filters.priceRange[1] <= 300) params.price_lte = filters.priceRange[1];
    setSearchParams(params);
  };

  const resetFilters = () => {
    setFilters({
      searchTerm: '',
      tier: '',
      theme: '',
      time: '',
      priceSort: '',
      priceRange: [0, 300],
    });
    setSearchParams({});
  };


  return (
    <Box display="flex" flexDirection="column">
      <SearchInput
        value={filters.searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          updateFilter('searchTerm', e.target.value)}
        placeholder="Quick search"
      />
      <PriceSlider
        value={filters.priceRange}
        onChange={(_, val) => updateFilter('priceRange', val)}
        min={0}
        max={300}
      />
      <DropdownFilter label="Tier" options={tierOptions} value={filters.tier} onChange={(e) => updateFilter('tier', e.target.value)} />
      <DropdownFilter label="Theme" options={themeOptions} value={filters.theme} onChange={(e) => updateFilter('theme', e.target.value)} />
      <DropdownFilter label="Time" options={timeOptions} value={filters.time} onChange={(e) => updateFilter('time', e.target.value)} />
      <DropdownFilter label="Price Sort" options={priceSortOptions} value={filters.priceSort} onChange={(e) => updateFilter('priceSort', e.target.value)} />
      <FilterButtons onReset={resetFilters} onSearch={applyFilters} />
    </Box>
  );
};

export default FilterComponent;
