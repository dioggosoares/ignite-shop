import Image from 'next/future/image'

import logo from '../../assets/logo.svg'
import { HeaderApp } from './styles'

export function Header() {
  return (
    <HeaderApp>
      <Image src={logo} alt="" />
    </HeaderApp>
  )
}
