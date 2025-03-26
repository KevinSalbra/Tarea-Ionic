import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { useProductos } from '../hooks/useProducts';

describe('useProductos', () => {
  beforeEach(() => {
    global.fetch = vi.fn((): Promise<{ json: () => Promise<any[]> }> =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: 1, title: 'Producto 1', image: 'image1.jpg' },
            { id: 2, title: 'Producto 2', image: 'image2.jpg' },
          ]),
      })
    ) as Mock; 
  });

  afterEach(() => {
    vi.restoreAllMocks(); 
  });

  it('should make an API call to fetch products', async () => {
    renderHook(() => useProductos());

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });
  });

  it('should render more products when loadMoreData is called', async () => {
    const { result } = renderHook(() => useProductos());

    await waitFor(() => {
      expect(result.current.visibleProductos.length).toBeGreaterThan(0);
    });

    act(() => {
      result.current.loadMoreData({
        target: { complete: vi.fn() },
      } as any);
    });

    await waitFor(() => {
      expect(result.current.visibleProductos.length).toBeGreaterThan(1);
    });
  });

  it('should make an API call to fetch products', async () => {
    renderHook(() => useProductos());

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');
    });
  });
});

