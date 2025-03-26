import { useState, useEffect, useCallback } from "react";

interface Producto {
  id: number;
  title: string;
  image: string;
}

const ITEMS_PER_PAGE = 10;

export const useProductos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [visibleProductos, setVisibleProductos] = useState<Producto[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProductos(data);
        setVisibleProductos(data.slice(0, ITEMS_PER_PAGE));
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };
    fetchData();
  }, []);

  const loadMoreData = useCallback((event: CustomEvent<void>) => {
    setTimeout(() => {
      const nextPage = page + 1;
      const nextProducts = productos.slice(0, nextPage * ITEMS_PER_PAGE);

      setVisibleProductos(nextProducts);
      setPage(nextPage);
      setHasMore(nextProducts.length < productos.length);

      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 1000);
  }, [page, productos]);

  return { visibleProductos, loadMoreData, hasMore };
};
