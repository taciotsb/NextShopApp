import type { AppProps } from 'next/app';
import { globalStyles } from '../styles/global';
import logo from '../Assets/logo.svg';
import { Container, 
         Header,
         BarContainer, 
         BarContentContainer,
         ProductItemContainer,
         ExitContainer,
         ContainerItems,
         HandbagContainer,
         FinishContainer} from '../styles/pages/app';
import Image from 'next/image';
import { Handbag, X } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { CartProvider, useShoppingCart } from 'use-shopping-cart';
import axios from 'axios';
globalStyles();

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image:string;
}


export default function App({ Component, pageProps }: AppProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe=''
      currency="USD"
      shouldPersist
      >
      <Container>
        <BarContainer open={sidebarOpen}>
          <BarContentContainer>
            <ExitContainer>
              <X size={32} onClick={toggleSidebar} />
            </ExitContainer>
            <h2>Sacola de compras</h2>
            <ProductsItem />
            </BarContentContainer>
            <FinishItem/>
          </BarContainer>
        <Header>
          <Image src={logo} alt='logo'/>
          <BagFinished onClick={toggleSidebar}/>
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}

interface bagProps{
  onClick: ()=>void,
}

export function BagFinished({onClick}:bagProps){
  const {cartCount} = useShoppingCart();

  return(
    <HandbagContainer>
      <Handbag size={32} onClick={onClick}/>
      <span>{cartCount}</span>
    </HandbagContainer>
  );
}

export function Barside(open:boolean){
  return(
    <BarContainer open={open}>
    </BarContainer>
  );
}


export function ProductsItem(){
    const {
    cartDetails,removeItem 
  } = useShoppingCart();

  function handleRemove(id:string){
    removeItem(id);
  }

  return(
      Object.values(cartDetails ?? {}).map((entry) => (
        <ContainerItems>
          <ProductItemContainer>
            <Image src={entry.image!} width={95} height={95} alt="Camiseta"/>
            <div>
              <h1>{entry.name}</h1>
              <span>{new Intl.NumberFormat('pt-BR', {
                    style:'currency',
                    currency:'BRL',
                    }).format(entry.price)}
                </span>
              <a onClick={() => handleRemove(entry.id)}>Remover</a>
            </div>
          </ProductItemContainer>
        </ContainerItems>
      ))
  );
}

export function FinishItem(){
  const {
  cartDetails,cartCount,totalPrice
} = useShoppingCart();

console.log(cartDetails);


async function handleBuyProduct() {
    try{
       const response = await axios.post('/api/checkout', {priceId: cartDetails});
       const { checkoutUrl } = response.data;
       window.location.href = checkoutUrl;
    }
    catch(err){
       alert('falha ao redirecionar checkout')
    }
}

return(
    <FinishContainer>
    <div>
        <h2>Quantidade</h2>
        <h3>{cartCount} itens</h3>
    </div>
    <div>
        <h1>Valor Total</h1>
        <span>{new Intl.NumberFormat('pt-BR', {
                style:'currency',
                currency:'BRL',
                }).format(totalPrice!)}</span>
    </div>
    <button onClick={handleBuyProduct}>Finalizar Compra</button>
    </FinishContainer>
);
}

