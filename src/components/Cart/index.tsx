import Image from "next/image"
import cartImage from "../../assets/cart.svg"
import { useSelector } from 'react-redux'
import { RootState } from "../../store/config"
import * as S from './styles'

export const Cart = () => {
  const itemsInCart = useSelector((state: RootState) => state.cart.countItems)

  return (
    <S.CartContainer>
      <S.Counter>{itemsInCart}</S.Counter>
      <Image src={cartImage} alt={`Carrinho com ${itemsInCart} itens`} />
    </S.CartContainer>
  )
}