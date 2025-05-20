import axios from 'axios';
import type { IProduct } from '../types/product';

interface FetchProductsParams {
  search?: string;
  title?: string;
  sort?: string; 
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number; 
  category?: string;
  tier?: string;
  theme?: string;
  priceGte?:number;
  priceLte?:number;
}

const api = axios.create({ baseURL: 'https://tymex-mock-server-nodejs-1-0.onrender.com/' });

export async function fetchProducts(params: FetchProductsParams = {}) {
  const { search, title, sort, order, page, limit, tier, theme, category, priceGte, priceLte } = params;

  

  try {
    const response = await api.get(`/products`, {
      params: {
        q: search,
        title_like: title,
        _sort: sort,
        _order: order,
        _page: page,
        _limit: limit,
        tier: tier,
        theme: theme,
        category: category,
        price_gte:priceGte,
        price_lte:priceLte
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const fetchNewArrivals = async (): Promise<IProduct[]> => {
  const response = await api.get('/products?_sort=createdAt&_order=desc&_limit=4');
  return response.data;
};