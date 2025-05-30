import { useEffect } from "react"

export function useSmoothScroll() {
  useEffect(() => {
    const scrollContainer = document.querySelector("[data-scroll-container]")
    if (!scrollContainer) return

    let current = 0
    let target = 0
    let ease = 0.075

    const updateScroll = () => {
      target = window.scrollY
      current += (target - current) * ease

      scrollContainer.scrollTo(0, current)

      requestAnimationFrame(updateScroll)
    }

    requestAnimationFrame(updateScroll)
  }, [])
}
