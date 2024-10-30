import {ObjectDetector} from './vision_bundle.js';
// import {ObjectDetector} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0';
import BaseDetector from './BaseDetector.js';
import toFixed from '../utils/toFixed.js';

/**
 * Wrapper Class for MediaPipe's ObjectDetector.
 */
export default class extends BaseDetector {
  /**
   * Detector.
   * @private
   * @type {ObjectDetector}
   */
  #detector;

  /**
   * Last detected playback time.
   * @private
   * @type {number}
   */
  #lastVideoTime = -1;

  /**
   * Detector options.
   * @private
   * @type {any}
   */
  #options;

  /**
   * Default detector options.
   * @private
   * @type {any}
   */
  #defaultOptions = {
    modelAssetPath: 'models/efficientdet_lite0_float16.tflite',
    delegate: 'GPU',
    runningMode: 'IMAGE',
    maxResults: 1,
    scoreThreshold: 0.5,
  };

  /**
   * @param {HTMLImageElement|HTMLVideoElement} mediaElement Media Element.
   * @param {HTMLCanvasElement} canvas Detection result drawing canvas.
   * @param {any} options Detector options.
   */
  constructor(mediaElement, canvas, options) {
    super(mediaElement, canvas);

    // Initialize options.
    this.#options = Object.assign(this.#defaultOptions, options);
  }

  /**
   * Initializes the Wasm runtime and creates a new object detector from the provided options.
   * @public
   */
  async init() {
    console.log('Begin initialization of the object detector.');

    // Processing start time.
    const startTime = performance.now();

    // A new instance of the object detector.
    this.#detector = await ObjectDetector.createFromOptions(await super.forVisionTasks(), {
      baseOptions: {
        modelAssetPath: this.#options.modelAssetPath,
        delegate: this.#options.delegate,
      },
      runningMode: this.#options.runningMode,
      maxResults: this.#options.maxResults,
      scoreThreshold: this.#options.scoreThreshold,
    });
    console.log(`Initialization of the object detector is complete. (${toFixed((performance.now() - startTime)/1000, 3)}s)`);
  }

  /**
   * Detect.
   * @public
   */
  detect = async () => {
    let detections;
    if (this.mediaElement instanceof HTMLImageElement)
      // Detect.
      detections = this.#detector.detect(this.mediaElement).detections;
    else if (this.mediaElement instanceof HTMLVideoElement) {
      // The timestamp of the current frame, in ms.
      const timestamp = performance.now();
      if (this.mediaElement.currentTime === this.#lastVideoTime)
        // Do nothing if the video frame has already been detected in the previous frame.
        return;

      // Save the last detected playback time.
      this.#lastVideoTime = this.mediaElement.currentTime;

      // Detect.
      detections = this.#detector.detectForVideo(this.mediaElement, timestamp).detections;
    }

    // Draw bounding box.
    super.drawBoundingBox(detections);
  }

  /**
   * Update detector options.
   * @public
   * @param {any} options Detector options.
   */
  async updateOptions(options) {
    // Initialize options.
    options = Object.assign(this.#defaultOptions, options);

    // Update detector options.
    await this.#detector.setOptions({
      baseOptions: {
        modelAssetPath: options.modelAssetPath,
        delegate: options.delegate,
      },
      maxResults: options.maxResults,
      scoreThreshold: options.scoreThreshold,
    });
  }
}