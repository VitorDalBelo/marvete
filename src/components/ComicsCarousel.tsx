import React, { useState , useEffect} from "react"
import "../styles/slide.css"
import { useKeenSlider ,TrackSlidesConfigOption } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import {comicsCarouselEndpoitsConfig , breakpoint} from '../carouselBreakpoints/comicsCarousel'
interface propsCarousel{
   children : React.ReactFragment,
   breakpoints?: breakpoint,
   initial?: number,
   loop?:
     | boolean
     | {
         min?: number
         max?: number
       },
  drag?: boolean,
  slides?:
  | ((size: number, slides: HTMLElement[]) => TrackSlidesConfigOption)
  | number
  | {
      origin?: 'center' | 'auto' | number
      number?: number | (() => number | null) | null
      perView?: 'auto' | number | (() => number | 'auto')
      spacing?: number | (() => number)
    }
  | null,
  disabled ?: boolean,
  arrows ?: boolean,
  autopass ?: boolean,
  dots ?: boolean,
}
const functionAutoPass =     (slider : any) => {
  let timeout: ReturnType<typeof setTimeout>
  let mouseOver = false
  function clearNextTimeout() {
    clearTimeout(timeout)
  }
  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 3000)
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true;
      clearNextTimeout();
      
    })

    slider.container.addEventListener("mouseout", () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })
  slider.on("dragStarted", clearNextTimeout)
  slider.on("animationEnded", nextTimeout)
  slider.on("updated", nextTimeout)
}



export default function ComicsCarrousel(props : propsCarousel) {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: typeof props.loop== 'boolean'?props.loop : true,
    initial: typeof props.initial== 'number'?props.initial :0,
    drag:typeof props.drag== 'boolean'?props.drag :!props.arrows,
    disabled:typeof props.disabled== 'boolean'?props.disabled :false,
    slides: props.slides ?props.slides :{
      number:20,
      origin:'center',
      perView:15,
      
    },
    breakpoints: props.breakpoints,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },

  }, props.autopass?[functionAutoPass]:[])
   
  useEffect(()=>{instanceRef.current?.update()},[props.children]);

  return (
    <>
    
      <div className="navigation-wrapper">
        {props.children?
        <div ref={sliderRef}  className={`keen-slider ${props.drag?'grabbable':''}`}>
          
          {
          props.children
          }
        </div>:''
        }
        {props.arrows &&  instanceRef.current ? 
          
          <>
            
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }

            />
          </>:''
        }

      </div>
      { props.dots && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              )
            })}
          </div>
        )}

    </>
  )
}

function Arrow(props: {
  disabled?: boolean
  left?: boolean
  onClick: (e: any) => void
}) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
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
