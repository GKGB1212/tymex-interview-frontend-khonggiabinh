import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders } from '../../../tests/test-utils';
import NewArrivalSection from '.';
import * as api from '../../../services/api'
import type { IProduct } from '../../../types/product';

const mockFetchNewArrivals = vi.spyOn(api, 'fetchNewArrivals');

const fakeProducts: IProduct[] = [
    {
      id: 1,
      title: "Metal Gear Girl",
      category: "Upper Body",
      price: 30.09,
      isFavorite: false,
      createdAt: 1624533946000,
      theme: "Halloween",
      tier: "Premium",
      imageId: 8,
      author: {
        firstName: "Dewie",
        lastName: "Labeuil",
        email: "dlabeuilv@nba.com",
        gender: "Male",
        avatar: "https://robohash.org/nihiltotamdolorem.png?size=100x100&set=set1",
        onlineStatus: "idle"
      }
    }
  ];
  

describe('NewArrivalSection', () => {
    beforeEach(() => {
        mockFetchNewArrivals.mockReset();
    });

    it('shows loading initially', async () => {
        mockFetchNewArrivals.mockImplementation(() => new Promise(() => { }));
        renderWithProviders(<NewArrivalSection />);
        expect(screen.getByText(/Loading/i)).not.toBeNull();
    });

    it('shows error if fetch fails', async () => {
        mockFetchNewArrivals.mockRejectedValue(new Error('API failed'));
        renderWithProviders(<NewArrivalSection />);
        expect(await screen.findByText(/failed to load new arrivals/i)).not.toBeNull();
    });

    it('renders product cards if fetch succeeds', async () => {
        mockFetchNewArrivals.mockResolvedValue(fakeProducts);
        renderWithProviders(<NewArrivalSection />);
        for (const product of fakeProducts) {
            expect(await screen.findByText(product.title)).not.toBeNull();
        }
    });

    it('renders nothing if product list is empty', async () => {
        mockFetchNewArrivals.mockResolvedValue([]);
        renderWithProviders(<NewArrivalSection />);
      
        await waitFor(() => {
          expect(screen.queryByText(/failed/i)).toBe(null);
          expect(screen.queryByText(/loading/i)).toBe(null);
        });
      
        expect(screen.queryByText(fakeProducts[0].title)).toBe(null);
      });
      
});
