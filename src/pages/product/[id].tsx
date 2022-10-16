import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image";
import Head from "next/head";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product"
import { ProductProps } from "../../types/IProduct";
import { useDispatch } from 'react-redux'
import { addToCart, useCartReducer } from "../../store/features/cart/cartSlice";

export default function Product({ product }: ProductProps) {
  const dispatch = useDispatch()

  const { items } = useCartReducer()
  const alreadyStored = !!items.find(item => item.id === product.id)

  function handleBuyButton() {
    dispatch(addToCart(product))
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button disabled={alreadyStored} onClick={handleBuyButton}>
            {alreadyStored ? "Item adicionado" : "Colocar na sacola"}
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MLH5Wy0Y97hDAC' } },
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id, 
        productPrice: price.unit_amount / 100
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
