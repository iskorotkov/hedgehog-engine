function getCanvas () {
  const canvas = document.getElementById('canvas')
  if (!canvas) {
    console.error('Couldn\'t find canvas')
    return
  }

  canvas.innerHTML = 'Hello there!'
}

getCanvas()
