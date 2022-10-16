import Image from "next/future/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import * as S from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import shopIcon from '../assets/cart.svg'
import type { IProduct } from '../types/IProduct'
import { useCartReducer } from "../store/features/cart/cartSlice"

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { items } = useCartReducer()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 'auto',
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          const isAddedInCart = items.find(({ id }) => id === product.id)

          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <S.Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <S.FooterInfo>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </S.FooterInfo>

                  <S.ButtonBuy>
                    {isAddedInCart 
                      ? <span>✔️</span> 
                      : <Image 
                          src={shopIcon}
                          alt='Compre!' 
                        />
                    }
                  </S.ButtonBuy>
                </footer>
              </S.Product>
            </Link>
          )
        })}
      </S.HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
      productPrice: price.unit_amount / 100
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
