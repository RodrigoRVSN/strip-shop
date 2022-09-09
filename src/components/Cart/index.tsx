import Image from "next/image"
import cartImage from "../../assets/cart.svg"
import { useSelector } from 'react-redux'
import { RootState } from "../../store/config"
import * as S from './styles'
import { useState } from "react"
import { Drawer } from "./components/Drawer"

export const Cart = () => {
  const itemsInCart = useSelector((state: RootState) => state.cart.countItems)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = () => setIsDrawerOpen(prevState => !prevState)

  return (
    <> 
      <S.CartContainer onClick={toggleDrawerOpen}>
        <S.Counter>{itemsInCart}</S.Counter>
        <Image src={cartImage} alt={`Carrinho com ${itemsInCart} itens`} />
      </S.CartContainer>

      {isDrawerOpen &&
        <Drawer toggleOpen={toggleDrawerOpen} />
      }
    </>

  )
}