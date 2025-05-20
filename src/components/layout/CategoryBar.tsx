import { Box, Button, styled, useTheme } from '@mui/material';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CATEGORIES = [
  'All',
  'Upper Body',
  'Lower Body',
  'Hat',
  'Shoes',
  'Accessory',
  'Legendary',
  'Mythic',
  'Epic',
  'Rare',
];

const MASK_GRADIENTS = {
  none: 'none',
  start: 'linear-gradient(to right, black 0, black calc(100% - 20px), transparent 100%)',
  end: 'linear-gradient(to right, transparent 0, black 20px, black 100%)',
  both: 'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)',
};

const CustomButton = styled(Button)(({ theme }) => ({
  minWidth: 'max-content',
  whiteSpace: 'nowrap',
  color: theme.palette.custom.neutral5,
  boxShadow: 'none',
  textTransform: 'none',
  fontWeight: 'bold',
  background: theme.palette.custom.primaryGradient,
  transition: 'background 0.4s ease, color 0.4s ease',
  padding: '10px 16px',
  fontSize: 16,
  '&:hover, &:active, &:focus': {
    background: theme.palette.custom.primaryGradient,
    border: 'none',
  },
  '@media (max-width:600px)': {
    padding: '6px 10px',
    fontSize: 14,
  },
}));

export default function CategoryBar() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const currentCategory = searchParams.get('category') || 'All';

  const handleCategoryClick = useCallback((category: string) => {
    setSearchParams((params) => {
      if (category === 'All') {
        params.delete('category');
      } else {
        params.set('category', category);
      }
      params.set('page', '1');
      return params;
    });
  }, [setSearchParams]);

  const updateScrollIndicators = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { scrollLeft, clientWidth, scrollWidth } = container;
    setIsAtStart(scrollLeft === 0);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateScrollIndicators();
    container.addEventListener('scroll', updateScrollIndicators);
    window.addEventListener('resize', updateScrollIndicators);

    return () => {
      container.removeEventListener('scroll', updateScrollIndicators);
      window.removeEventListener('resize', updateScrollIndicators);
    };
  }, [updateScrollIndicators]);

  const maskImage = useMemo(() => {
    if (isAtStart && isAtEnd) return MASK_GRADIENTS.none;
    if (isAtStart) return MASK_GRADIENTS.start;
    if (isAtEnd) return MASK_GRADIENTS.end;
    return MASK_GRADIENTS.both;
  }, [isAtStart, isAtEnd]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        display: 'flex',
        gap: 3,
        pb: 4,
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        maskImage,
        WebkitMaskImage: maskImage,
      }}
    >
      {CATEGORIES.map((category) => {
        const isActive = category === currentCategory;
        const bg = isActive
          ? theme.palette.custom.primaryGradient
          : 'linear-gradient(91.47deg, rgba(218, 69, 143, 0.4) -6%, rgba(218, 52, 221, 0.4) 113.05%)';

        return (
          <CustomButton
            key={category}
            onClick={() => handleCategoryClick(category)}
            sx={{ background: bg }}
          >
            {category}
          </CustomButton>
        );
      })}
    </Box>
  );
}
