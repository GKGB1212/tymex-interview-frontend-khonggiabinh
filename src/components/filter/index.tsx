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
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [tier, setTier] = useState(searchParams.get('tier') || '');
  const [theme, setTheme] = useState(searchParams.get('theme') || '');
  const [time, setTime] = useState(searchParams.get('time') || '');
  const [priceSort, setPriceSort] = useState(searchParams.get('priceSort') || '');
  const [priceRange, setPriceRange] = useState<number[]>([
    Number(searchParams.get('minPrice')) || 0,
    Number(searchParams.get('maxPrice')) || 100,
  ]);

  const handleSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  useDebouncedCallback(searchTerm, (value) => {
    setSearchParams(prev => {
      const currentParams = new URLSearchParams(prev);
      currentParams.set('search', value);
      return currentParams;
    });
  }, 300);

  const handleTierChange = (e: any) => setTier(e.target.value);
  const handleThemeChange = (e: any) => setTheme(e.target.value);
  const handleTimeChange = (e: any) => setTime(e.target.value);
  const handlePriceSortChange = (e: any) => setPriceSort(e.target.value);
  const handlePriceRangeChange = (e: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTier('');
    setTheme('');
    setTime('');
    setPriceSort('');
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  const applyFilters = () => {
    const params: any = {};
    if (tier) params.tier = tier;
    if (theme) params.theme = theme;
    if (time) params.time = time;
    if (priceSort) params.priceSort = priceSort;
    if (priceRange[0] > 0) params.minPrice = priceRange[0];
    if (priceRange[1] < 100) params.maxPrice = priceRange[1];
    setSearchParams(params);
  };

  return (
    <Box display="flex" flexDirection="column">
      <SearchInput value={searchTerm} onChange={handleSearchTermChange} placeholder="Quick search" />
      <PriceSlider
        value={priceRange}
        onChange={handlePriceRangeChange}
        min={0}
        max={300}
      />
      <DropdownFilter
        label="Tier"
        options={tierOptions}
        value={tier}
        onChange={handleTierChange}
      />
      <DropdownFilter
        label="Theme"
        options={themeOptions}
        value={theme}
        onChange={handleThemeChange}
      />
      <DropdownFilter
        label="Time"
        options={timeOptions}
        value={time}
        onChange={handleTimeChange}
      />
      <DropdownFilter
        label="Price Sort"
        options={priceSortOptions}
        value={priceSort}
        onChange={handlePriceSortChange}
      />

      <FilterButtons onReset={resetFilters} onSearch={applyFilters} />
    </Box>
  );
};

export default FilterComponent;
