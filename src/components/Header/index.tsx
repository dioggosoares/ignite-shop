import Image from 'next/future/image'
import { HandbagSimple } from 'phosphor-react'

import logo from '../../assets/logo.svg'
import { CartBadge, HeaderApp } from './styles'

export function Header() {
  return (
    <HeaderApp>
      <Image src={logo} alt="" />
      <CartBadge>
        <HandbagSimple size={28} />
      </CartBadge>
    </HeaderApp>
  )
}
