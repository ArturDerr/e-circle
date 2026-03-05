import { type ReactNode, useEffect } from "react"
import Lenis from "lenis"

interface Props {
  children: ReactNode
}

export const SmoothScrollProvider = ({ children }: Props) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.1,
      smoothWheel: true,
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
