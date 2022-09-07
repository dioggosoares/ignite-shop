import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { HandbagSimple } from 'phosphor-react'
import { useKeenSlider } from 'keen-slider/react'

import {
  ButtonBag,
  HomeContainer,
  NavigationWrapper,
  // ProductContainer,
  Product,
} from '../styles/pages/home'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'
import camiseta4 from '../assets/camisetas/4.png'

import 'keen-slider/keen-slider.min.css'
import styles from '../styles/pages/arrows.module.css'

interface ArrowProps {
  onClick: (e: any) => void
  disabled: boolean
  left?: boolean
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <>
      <Head>
        <title>Ignite Shop | Home</title>
      </Head>
      <NavigationWrapper>
        <HomeContainer ref={sliderRef} className="keen-slider">
          {/* <ProductContainer> */}
          <Product className="keen-slider__slide">
            <Image src={camiseta1} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>Camiseta Maratona Explorer</strong>
                <span>R$ 79,90</span>
              </div>
              <ButtonBag>
                <HandbagSimple size={28} />
              </ButtonBag>
            </footer>
          </Product>

          <Product className="keen-slider__slide">
            <Image src={camiseta2} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>Camiseta Maratona Explorer</strong>
                <span>R$ 79,90</span>
              </div>
              <ButtonBag>
                <HandbagSimple size={28} />
              </ButtonBag>
            </footer>
          </Product>

          <Product className="keen-slider__slide">
            <Image src={camiseta3} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>Camiseta Igniter Lab</strong>
                <span>R$ 79,90</span>
              </div>
              <ButtonBag>
                <HandbagSimple size={28} />
              </ButtonBag>
            </footer>
          </Product>

          <Product className="keen-slider__slide">
            <Image src={camiseta4} width={520} height={480} alt="" />

            <footer>
              <div>
                <strong>Camiseta Igniter Onboard</strong>
                <span>R$ 79,90</span>
              </div>
              <ButtonBag>
                <HandbagSimple size={28} />
              </ButtonBag>
            </footer>
          </Product>
          {/* </ProductContainer> */}
        </HomeContainer>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </NavigationWrapper>
    </>
  )
}

function Arrow(props: ArrowProps) {
  const disabeld = props.disabled ? ' arrow--disabled' : ''
  return (
    <svg
      onClick={props.onClick}
      className={`${styles.arrow} ${
        props.left ? styles.arrowleft : styles.arrowright
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
