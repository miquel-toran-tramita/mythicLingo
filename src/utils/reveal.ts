export const animReveal = () => {
  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.removeAttribute('reveal')
        entry.target.setAttribute('revealed', '')
      }
    })
  }

  const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1,
    //threshold = qué porcentaje de pixeles del componente se tienen que ver para que inicie la animación
  }

  const observer = new IntersectionObserver(callback, options)

  const reveals = document.querySelectorAll('[reveal]')

  reveals.forEach((element: HTMLElement) => {
    const delay = Number(element.getAttribute('reveal') || '0')
    element.style.transition = `transform 1s ease ${delay}s, opacity 1s ease ${delay}s`
    observer.observe(element)
  })
}
