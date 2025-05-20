import { useState, useEffect } from 'react';
import { Grid, Box, Typography, Button, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { fetchProducts } from '../../../services/api';
import type { IProduct } from '../../../types/product';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';

const LIMIT_RESULT = 20;
export default function ProductGrid() {
  const themeMaterial = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const page = Number(searchParams.get('page')) || 1;
  const order = searchParams.get('order') || '';
  const tier = searchParams.get('tier') || '';
  const theme = searchParams.get('theme') || '';
  const time = searchParams.get('time') || '';
  const priceSort = searchParams.get('priceSort') || '';
  const priceGte = searchParams.get('price_gte') || '';
  const priceLte = searchParams.get('price_lte') || '';

  const handleLoadMore = () => {
    setSearchParams((prev) => {
      const currentPage = Number(prev.get('page')) || 1;
      prev.set('page', String(currentPage + 1));
      return prev;
    });
  };

  const loadProducts = async (limit: number = LIMIT_RESULT, isReset = false) => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        search: search || undefined,
        category: category || undefined,
        page: isReset ? 1 : page,
        sort: time ? "_createdAt" : priceSort ? "price" : undefined,
        order: time ? (time as 'asc' | 'desc') : priceSort ? (priceSort as 'asc' | 'desc') : undefined,
        limit: limit,
        tier: tier || undefined,
        theme: theme || undefined,
        priceGte: parseInt(priceGte) || undefined,
        priceLte: parseInt(priceLte) || undefined,
      });
      setProducts((prev) => (page === 1 || isReset ? data : [...prev, ...data]));
      setError(null);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, search, category, order, time, priceSort, theme, tier, priceGte, priceLte]);


  useEffect(() => {
    const interval = setInterval(() => {
      loadProducts(page * LIMIT_RESULT, true);
    }, 60000);

    return () => clearInterval(interval);
  }, [setSearchParams]);

  return (
    <Box>
      {loading && page === 1 ? (
        <Grid container spacing={4}>
          {Array(16).fill(0).map((_, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : products.length === 0 ? (
        <Box display={'flex'} justifyContent={'center'}>
           <Typography sx={{fontFamily:'DroneRangerPro', fontSize:30}}>No products found</Typography>
        </Box>
       
      ) : (
        <>
          <Box sx={{
            maxHeight: '2069px',
            borderRadius:2,
            pr: { xs: 1, md: 3 },
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#777777',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#fbbc04',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#ffcc33',
            },
            scrollbarWidth: 'thin',
            scrollbarColor: '#FFCC21 #777777',
          }}>
            <Grid container spacing={4}>
              {products.map((product) => (
                <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button variant="contained" size="large"
              onClick={handleLoadMore}
              sx={{
                px: 12,
                py: 3,
                textTransform: 'capitalize',
                fontWeight: 'bold',
                fontSize: '16px',
                background: themeMaterial.palette.custom?.primaryGradient,
                backgroundSize: '200%',
                boxShadow: '0px 0px 50px 0px #BB4BFF52',
                backgroundPosition: 'left',
                '&:hover': {
                  backgroundPosition: 'right',
                },
              }}>
              View more
            </Button></Box>
        </>

      )
      }
    </Box >
  );
}