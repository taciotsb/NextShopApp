import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import camiseta1 from '../Assets/camisetas/1.png';
import camiseta2 from '../Assets/camisetas/2.png';
import camiseta3 from '../Assets/camisetas/3.png';
import { stripe } from "../lib/stripe";
import { GetStaticProps } from "next";
import Stripe from "stripe";
import Head from "next/head";
import { Handbag } from "phosphor-react";
import {useShoppingCart } from 'use-shopping-cart';
import { useEffect } from "react";
import { Router, useRouter } from "next/router";

interface Iproduct{
    id:string,
    name:string,
    imageUrl:string,
    price:number,
    defaultPriceId:string
}

interface HomeProps{
  products: Iproduct[];
}

export default function Home({products}:HomeProps) {
  const navigator = useRouter();
  
  const [sliderRef] = useKeenSlider({
    slides:{
      perView:3,
      spacing:48,
    }
  })

  const {addItem, clearCart} = useShoppingCart();

  const handleAddToCart = (product: Iproduct) => {
      addItem({
      id: product.defaultPriceId ,
      name: product.name,
      price: product.price,
      currency: 'R$',
      quantity: 1,
      image:product.imageUrl,
      value:product.price,
  });
  };

  
  return (
    <>
    <Head>
      <title>Home | Ignite Shop</title>
    </Head>
    <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return(
              <Product key={product.id} className="keen-slider__slide">
                <Image src={product.imageUrl} onClick={()=>navigator.push(`/product/${product.id}`)} width={520} height={480} alt="Camiseta"/>
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{new Intl.NumberFormat('pt-BR', {
                            style:'currency',
                            currency:'BRL',
                            }).format(product.price)}</span>
                  </div>
                  <Handbag size={32} onClick={() => handleAddToCart(product)} />
                </footer>
              </Product>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const response = await stripe.products.list({
    expand:['data.default_price']
  });


  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return{
      id:product.id,
      name:product.name,
      imageUrl: product.images[0],
      price:((price.unit_amount || 0) / 100),
      defaultPriceId:price.id
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, //2hours
  }
}

