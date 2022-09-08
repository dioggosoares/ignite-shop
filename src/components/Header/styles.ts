import { styled } from '../../styles'

export const HeaderApp = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CartBadge = styled('div', {
  backgroundColor: '$gray800',
  border: 'none',
  borderRadius: 6,
  padding: '0.625rem',
})
