import Image from "next/image"
import cartImage from "../../assets/cart.svg"
import * as S from './styles'
import { useState } from "react"
import { Drawer } from "./components/Drawer"
import { useCartReducer } from "../../store/features/cart/cartSlice"

export const Cart = () => {
  const { countItems } = useCartReducer()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawerOpen = () => setIsDrawerOpen(prevState => !prevState)

  return (
    <> 
      <S.CartContainer onClick={toggleDrawerOpen}>
        <S.Counter>{countItems}</S.Counter>
        <Image src={cartImage} alt={`Carrinho com ${countItems} itens`} />
      </S.CartContainer>

      {isDrawerOpen &&
        <Drawer toggleOpen={toggleDrawerOpen} />
      }
    </>
  )
}
