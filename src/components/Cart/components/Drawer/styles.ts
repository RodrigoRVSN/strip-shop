import { keyframes, styled } from "@stitches/react";

const appear = keyframes({
  '0%': { transform: 'translateX(50%)' },
  '100%': { transform: 'translateX(0)' },
})


export const DrawerContainer = styled('section', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  minHeight: '100%',
  width: 480,
  padding: 24,
  backgroundColor: '#202024',
  zIndex: 1,
  animation: `${appear} 0.5s`
})

export const Title = styled('h1', {
  fontSize: 20,
  marginTop: 20,
  marginBottom: 32,
})

export const ButtonClose = styled('button', {
  backgroundColor: 'transparent',
  border: 0,
  fontSize: 24,
  color: '#8D8D99',
  marginLeft: 'auto',
  display: 'flex',
  cursor: 'pointer'
})

export const ProductItem = styled('div', {
  display: 'flex',
  gap: 20,
  marginBottom: 24
})

export const ProductInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  p: {
    fontSize: 18,
    color: "#C4C4CC"
  },

  span: {
    fontSize: 18,
    color: "#E1E1E6",
    fontWeight: 700
  },

  button: {
    backgroundColor: 'transparent',
    border: 0,
    textAlign: 'left',
    color: '#00875F',
    fontWeight: 700,
    cursor: "pointer"
  }
})

export const OrderInfo = styled('div', {
  display: "flex",
  justifyContent: 'space-between',
})

export const OrderItem = styled('div', {
  display: "flex",
  flexDirection: 'column',
  gap: 8,

  '& + &': {
    textAlign: 'right',
  }
})

export const ButtonFinished = styled('button', {
  width: '100%',
  padding: 24,
  fontSize: 18,
  borderRadius: 8,
  border: 0,
  backgroundColor: '#00875F',
  color: '#FFFFFF',
  cursor: 'pointer',
  marginTop: 55,

  '&:hover': {
    opacity: 0.8
  }
})

export const EmptyText = styled('span', {
  fontSize: 18,
  margin: 'auto',
  marginTop: 90,
})