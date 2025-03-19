import {
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonAvatar, IonLabel, IonInfiniteScroll, IonInfiniteScrollContent,
} from "@ionic/react";
import { useEffect, useState } from "react";

const Productos: React.FC = () => {
  interface Producto {
    id: number;
    title: string;
    image: string;
  }

  const [productos, setProductos] = useState<Producto[]>([]);
  const [visibleProductos, setVisibleProductos] = useState<Producto[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProductos(data);
      setVisibleProductos(data.slice(0, itemsPerPage));
    };
    fetchData();
  }, []);

  const loadMoreData = (event: CustomEvent<void>) => {
    setTimeout(() => {
      const nextPage = page + 1;
      const nextProducts = productos.slice(0, nextPage * itemsPerPage);
      setVisibleProductos(nextProducts);
      setPage(nextPage);


      if (nextProducts.length >= productos.length) {
        (event.target as HTMLIonInfiniteScrollElement).disabled = true;
      }

      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 1000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Productos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {visibleProductos.map((producto) => (
            <IonItem key={producto.id}>
              <IonAvatar slot="start">
                <img src={producto.image} alt={producto.title} />
              </IonAvatar>
              <IonLabel>{producto.title}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll threshold="100px" onIonInfinite={loadMoreData}>
          <IonInfiniteScrollContent
            loadingText="Cargando más productos..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Productos;