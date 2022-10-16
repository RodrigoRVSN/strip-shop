import * as S from './styles'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { removeFromCart, useCartReducer } from '../../../../store/features/cart/cartSlice'
import { IProduct } from '../../../../types/IProduct'
import axios from 'axios'

interface DrawerProps {
  toggleOpen: () => void
}

export const Drawer = ({ toggleOpen }: DrawerProps) => {
  const { countItems, items, totalPrice } = useCartReducer()
  
  const dispatch = useDispatch()

  const handleRemoveItem = (product: IProduct) => {
    dispatch(removeFromCart(product))
  }

  async function handleBuyButton() {
    try {
      const response = await axios.post('/api/checkout', {
        items
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <S.DrawerContainer>
      <S.ButtonClose onClick={toggleOpen}>✖️</S.ButtonClose>

      <S.Title>Sacola de compras</S.Title>


      {items.map(item => (
        <S.ProductItem key={item.id}>
          <Image
            src={item.imageUrl} 
            alt={`Item ${item.name}`} 
            height={100} 
            width={100} 
          />
          <S.ProductInfo>
            <p>{item.name}</p>
            <span>{item.price}</span>
            <button 
              onClick={() => handleRemoveItem(item)}
            >
              Remover
            </button>
          </S.ProductInfo>
        </S.ProductItem>
      ))}

      <S.OrderInfo>
        <S.OrderItem>
          <span>Quantidade</span>
          <span><b>Valor total</b></span>
        </S.OrderItem>


        <S.OrderItem>
          <span>{countItems} itens</span>
          <span><b>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            }).format(totalPrice)}
          </b></span>
        </S.OrderItem>
      </S.OrderInfo>


      <S.OrderInfo>
        {countItems === 0 
          ? <S.EmptyText>Nenhum produto no carrinho</S.EmptyText>
          : (
            <S.ButtonFinished onClick={handleBuyButton}>
              Finalizar compra
            </S.ButtonFinished>
          )
        }
      </S.OrderInfo>

      
    </S.DrawerContainer>
  )
}