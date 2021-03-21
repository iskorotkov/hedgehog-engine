/**
 * Options for creating MicrophoneInput.
 */
export interface Options {
  /**
   * Window size of Fast Fourier Transform (between 32 and 32768, default is 2048).
   */
  fftSize?: number
  /**
   * Averaging constant with the last analysis frame (between 0 and 1, default is 0.8).
   */
  smoothingTimeConstant?: number
  /**
   * Minimum power value in the scaling range for the FFT analysis data, for conversion to unsigned byte values.
   */
  minDecibels?: number
  /**
   * Maximum power value in the scaling range for the FFT analysis data, for conversion to unsigned byte values.
   */
  maxDecibels?: number
}

/**
 * Microphone input reader.
 */
export class MicrophoneInput {
  /**
   * Returns MicrophoneInput.
   * @param analyzer AnalyzerNode to use.
   * @param array Precreated array to use.
   */
  private constructor (private analyzer: AnalyserNode, private array: Uint8Array) {
    this.analyzer = analyzer
    this.array = array
  }

  /**
   * Create microphone input reader for media device.
   * @param options
   * @returns
   */
  static async create (options: Options) {
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

    if (options.fftSize !== undefined) {
      analyzer.fftSize = options.fftSize
    }

    if (options.smoothingTimeConstant !== undefined) {
      analyzer.smoothingTimeConstant = options.smoothingTimeConstant
    }

    if (options.minDecibels !== undefined) {
      analyzer.minDecibels = options.minDecibels
    }

    if (options.maxDecibels !== undefined) {
      analyzer.maxDecibels = options.maxDecibels
    }

    const array = new Uint8Array(analyzer.frequencyBinCount)
    return new MicrophoneInput(analyzer, array)
  }

  /**
   * Returns bytes captured from media device.
   *
   * Each item in the array represents the decibel value for a specific frequency.
   * The frequencies are spread linearly from 0 to 1/2 of the sample rate.
   * For example, for 48000 sample rate, the last item of the array will
   * represent the decibel value for 24000 Hz.
   * @returns Bytes captured from media device.
   */
  next () {
    this.analyzer.getByteFrequencyData(this.array)
    return this.array
  }
}
