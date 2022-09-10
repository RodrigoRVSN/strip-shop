import * as S from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store/config'
import Image from 'next/image'
import { removeFromCart } from '../../../../store/features/cart/cartSlice'
import { IProduct } from '../../../../types/IProduct'

interface DrawerProps {
  toggleOpen: () => void
}

export const Drawer = ({ toggleOpen }: DrawerProps) => {
  const { countItems, items, totalPrice } = useSelector((state: RootState) => state.cart)
  
  const dispatch = useDispatch()

  const handleRemoveItem = (product: IProduct) => {
    dispatch(removeFromCart(product))
  }

  return (
    <S.DrawerContainer>
      <S.ButtonClose onClick={toggleOpen}>X</S.ButtonClose>

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

      <S.ButtonFinished>
        Finalizar compra
      </S.ButtonFinished>
    </S.DrawerContainer>
  )
}