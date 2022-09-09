import { styled } from "@stitches/react";

export const CartContainer = styled('button', {
  position: 'relative',
  padding: 12,
  backgroundColor: '#202024',
  borderRadius: 6,
  cursor: 'pointer',
  border: 0,
})

export const Counter = styled('span', {
  position: 'absolute',
  top: '-20%',
  right: '-20%',
  backgroundColor: "#1ea483",
  borderRadius: '50%',
  height: 24,
  width: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
