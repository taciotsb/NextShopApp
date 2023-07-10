import { ProductContainer, ImageContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Image from "next/image";
import Stripe from "stripe";
import axios from "axios";
import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";

interface ProductProps{
    product:{
         id:string,
         name:string,
         imageUrl:string,
         price:number,
         description: string,
         defaultPriceId: string
    }
}

interface Iproduct{
    id:string,
    name:string,
    imageUrl:string,
    price:number,
    description: string,
    defaultPriceId: string
}

export default function Product({product}:ProductProps){

    const {addItem} = useShoppingCart();

    const handleAddToCart = (product: Iproduct) => {
        addItem({
        id: product.defaultPriceId , 
        name: product.name,
        price: product.price,
        currency: 'R$',
        quantity: 1,
        image:product.imageUrl
    });
    };
  

    return(
        <ProductContainer>
            <ImageContainer>
                <Image src={product.imageUrl} width={520} height={480} alt=""/>
            </ImageContainer>
            <ProductDetails>
                <h1>{product.name}</h1>
                <span>{new Intl.NumberFormat('pt-BR', {
                        style:'currency',
                        currency:'BRL',
                        }).format(product.price)}
                </span>
                <p>{product.description}</p>
                <button onClick={() => handleAddToCart(product)}>
                    Colocar na sacola
                </button>
            </ProductDetails>
        </ProductContainer>
    )
}

export const getStaticPaths:GetStaticPaths = async () => {
    return {
        paths: [
            { params: {id:'prod_O7TD1SAqaR4Dud' } }
        ],
        fallback:'blocking',
    }
}

export const getStaticProps:GetStaticProps<any, {id:string}> = async ({ params }) => {
    const productId = params!.id;
    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    })

    const price = product.default_price as Stripe.Price
    await new Promise(resolve => setTimeout(resolve, 2000));

    return{
        props:{
            product:{
                id:product.id,
                name:product.name,
                imageUrl: product.images[0],
                price: ((price.unit_amount || 0) / 100),
                description: product.description,
                defaultPriceId:price.id
            },
        },
       // revalidade: 60 * 60 * 1, // 1 hour
    }
}