import * as S from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/config'
import Image from 'next/image'

interface DrawerProps {
  toggleOpen: () => void
}

export const Drawer = ({ toggleOpen }: DrawerProps) => {
  const items = useSelector((state: RootState) => state.cart.items)

  return (
    <S.DrawerContainer>
      <S.ButtonClose onClick={toggleOpen}>X</S.ButtonClose>
      {items.map(item => (
        <div key={item.id}>
          <Image
            src={item.imageUrl} 
            alt={`Item ${item.name}`} 
            height={100} 
            width={100} 
          />
          <p>{item.name}</p>
        </div>
      ))}
    </S.DrawerContainer>
  )
}