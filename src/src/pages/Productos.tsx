import {IonButtons,IonContent,IonHeader,IonMenuButton,IonPage,IonTitle,IonToolbar,IonList,IonItem,IonAvatar,IonLabel,IonInfiniteScroll,IonInfiniteScrollContent,
} from "@ionic/react";
import { useProductos } from "../hooks/useProducts"; 

const Productos: React.FC = () => {
  const { visibleProductos, loadMoreData, hasMore } = useProductos();

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

        {hasMore && (
          <IonInfiniteScroll threshold="100px" onIonInfinite={loadMoreData}>
            <IonInfiniteScrollContent loadingText="Cargando más productos..." />
          </IonInfiniteScroll>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Productos;
