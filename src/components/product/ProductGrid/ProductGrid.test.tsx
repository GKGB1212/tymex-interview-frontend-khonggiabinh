import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import ProductGrid from '.';
import * as api from '../../../services/api';

import { renderWithProviders } from '../../../tests/test-utils';

const mockFetchProducts = vi.spyOn(api, 'fetchProducts');

const fakeProducts = [
  {
    "id": 1,
    "title": "Metal Gear Girl",
    "category": "Mythic",
    "price": 30.09,
    "isFavorite": false,
    "createdAt": 1624533946000,
    "theme": "Halloween",
    "tier": "Premium",
    "imageId": 8,
    "author": {
      "firstName": "Dewie",
      "lastName": "Labeuil",
      "email": "dlabeuilv@nba.com",
      "gender": "Male",
      "avatar": "https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1",
      "onlineStatus": "idle"
    }
  },
  {
    "id": 2,
    "title": "Rhythm Ruler",
    "category": "Epic",
    "price": 52.57,
    "isFavorite": true,
    "createdAt": 1652687980000,
    "theme": "Halloween",
    "tier": "Deluxe",
    "imageId": 11,
    "author": {
      "firstName": "Thaddeus",
      "lastName": "Tumulty",
      "email": "ttumultyt@t-online.de",
      "gender": "Male",
      "avatar": "https://robohash.org/perferendisitaquedolor.png?size=100x100&set=set1",
      "onlineStatus": "offline"
    }
  },
];
describe('ProductGrid', () => {
  beforeEach(() => {
    mockFetchProducts.mockReset();
  });

  it('renders skeleton loader on loading', async () => {
    mockFetchProducts.mockImplementation(() => new Promise(() => { }));

    renderWithProviders(<ProductGrid />);

    expect(await screen.findAllByTestId('product-card-skeleton')).toHaveLength(16);
  });

  it('renders products after loading', async () => {

    mockFetchProducts.mockResolvedValue(fakeProducts);

    renderWithProviders(<ProductGrid />);

    for (const product of fakeProducts) {
      expect(await screen.findByText(product.title)).not.toBeNull();
    }
  });

  it('renders error message if fetch fails', async () => {
    mockFetchProducts.mockRejectedValue(new Error('API failed'));

    renderWithProviders(<ProductGrid />);

    expect(await screen.findByText('Failed to load products')).not.toBeNull();
  });

  it('renders "No products found" if product list is empty', async () => {
    mockFetchProducts.mockResolvedValue([]);

    renderWithProviders(<ProductGrid />);

    expect(await screen.findByText('No products found')).not.toBeNull();
  });
});
