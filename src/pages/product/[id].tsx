import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'
import Image from 'next/future/image'
import Head from 'next/head'
import Stripe from 'stripe'

import { stripe } from '../../services/stripe'

import { ProductProps } from '../../@types/Product'
import { currencyFormatter } from '../../utils/currencyFormatter'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState(false)

  async function handleBuyProduct() {
    try {
      setisCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // conectar a uma ferramenta de observabilidade (Datadog /Sentry)
      setisCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  const winTitle = `${product.name} | Ignite Shop`
  return (
    <>
      <Head>
        <title>{winTitle}</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>{product.description}</p>

          <button
            disabled={isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            Comprar agora
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_MOEQMuJg3i08E5' } }],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  const details = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    price: currencyFormatter(price.unit_amount! / 100),
    description: product.description,
    defaultPriceId: price.id,
  }

  return {
    props: {
      product: details,
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
