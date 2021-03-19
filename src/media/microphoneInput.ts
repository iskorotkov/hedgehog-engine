export class MicrophoneInput {
  private constructor (private analyzer: AnalyserNode, private array: Uint8Array) {
    this.analyzer = analyzer
    this.array = array
  }

  static async create (fftSize?: number, smoothingTimeConstant?: number) {
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (error) {
      console.error(`Couldn't get media devices: ${error}`)
      throw error
    }

    const audioCtx = new window.AudioContext()
    const analyzer = audioCtx.createAnalyser()
    const source = audioCtx.createMediaStreamSource(stream)

    source.connect(analyzer)

    if (fftSize !== undefined) {
      analyzer.fftSize = fftSize
    }

    if (smoothingTimeConstant !== undefined) {
      analyzer.smoothingTimeConstant = smoothingTimeConstant
    }

    const array = new Uint8Array(analyzer.frequencyBinCount)
    return new MicrophoneInput(analyzer, array)
  }

  next () {
    this.analyzer.getByteFrequencyData(this.array)
    return this.array
  }
}
