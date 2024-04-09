import {FaceDetector, FilesetResolver, DrawingUtils} from './vision_bundle.js';
// import {FaceDetector, FilesetResolver, DrawingUtils} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0';
import toFixed from '../utils/toFixed.js';

/**
 * Wrapper Class for MediaPipe's FaceDetector.
 */
export default class {
  /**
   * Media Element.
   * @type {HTMLImageElement|HTMLVideoElement}
   */
  #mediaElement;

  /**
   * Detection result drawing canvas.
   * @type {HTMLCanvasElement}
   */
  #canvas;

  /**
   * Face detector.
   * @type {FaceDetector}
   */
  #faceDetector;

  /**
   * Drawing tool instance.
   * @type {DrawingUtils}
   */
  #drawingUtils;

  /**
   * Face detector options.
   * @type {any}
   */
  #options;

  /**
   * Last detected playback time.
   * @type {number}
   */
  #lastVideoTime = -1;

  /**
   * Default face detector options.
   * @type {any}
   */
  #defaultOptions = {
    modelAssetPath: 'models/blaze_face_short_range.tflite',
    delegate: 'GPU',
    runningMode: 'IMAGE',
    minDetectionConfidence: 0.5,
  };

  /**
   * Getter to retrieve the Media Element.
   * @returns {HTMLImageElement|HTMLVideoElement} Media Element.
   */
  get mediaElement() {
    return this.#mediaElement;
  }

  /**
   * @param {HTMLImageElement|HTMLVideoElement} mediaElement Media Element.
   * @param {HTMLCanvasElement} canvas Detection result drawing canvas.
   * @param {any} options Face detector options.
   */
  constructor(mediaElement, canvas, options) {
    // Save media elements and canvas elements.
    this.#mediaElement = mediaElement;
    this.#canvas = canvas; 

    // Initialize options.
    this.#options = Object.assign(this.#defaultOptions, options);

    // Drawing tool instance.
    this.#drawingUtils = new DrawingUtils(canvas.getContext('2d'));

    // Match the dimensions of the canvas on which the bounding box is drawn to the media element.
    const {objectFit, objectPosition} = getComputedStyle(this.#mediaElement);
    // const {objectFit, objectPosition, width, height} = getComputedStyle(this.#mediaElement);
    this.#canvas.style.objectFit = objectFit;
    this.#canvas.style.objectPosition = objectPosition;
    // this.#canvas.style.width = width;
    // this.#canvas.style.height = height;
    // this.#canvas.width = this.#mediaElement instanceof HTMLImageElement ? this.#mediaElement.naturalWidth : this.#mediaElement.videoWidth;
    // this.#canvas.height = this.#mediaElement instanceof HTMLImageElement ? this.#mediaElement.naturalHeight : this.#mediaElement.videoHeight;;
  }

  /**
   * Initializes the Wasm runtime and creates a new face detector from the provided options.
   */
  async init() {
    console.log('Begin initialization of the face detector.');

    // Processing start time.
    const startTime = performance.now();

    // Creates a fileset for the MediaPipe Vision tasks.
    const vision = await FilesetResolver.forVisionTasks(
      // path/to/wasm/root
      'node_modules/@mediapipe/tasks-vision/wasm'
    );

    // A new instance of the face detector.
    this.#faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: this.#options.modelAssetPath,
        delegate: this.#options.delegate,
      },
      runningMode: this.#options.runningMode,
      minDetectionConfidence: this.#options.minDetectionConfidence,
    });
    console.log(`Initialization of the face detector is complete. (${toFixed((performance.now() - startTime)/1000, 3)}s)`);
  }

  /**
   * Face detection.
   */
  detectFaces = async () => {
    let detections;
    if (this.#mediaElement instanceof HTMLImageElement)
      // Face detection.
      detections = this.#faceDetector.detect(this.#mediaElement).detections;
    else if (this.#mediaElement instanceof HTMLVideoElement) {
      // The timestamp of the current frame, in ms.
      const timestamp = performance.now();
      if (this.#mediaElement.currentTime === this.#lastVideoTime)
        // Do nothing if the video frame has already been detected in the previous frame.
        return;

      // Save the last detected playback time.
      this.#lastVideoTime = this.#mediaElement.currentTime;

      // Face detection.
      detections = this.#faceDetector.detectForVideo(this.#mediaElement, timestamp).detections;
      // console.log('detections=', detections);
    }

    // Draw face bounding box.
    this.#drawBoundingBox(detections);
  }

  /**
   * Update face detector options.
   * @param {any} options Face detector options.
   */
  async updateOptions(options) {
    // Initialize options.
    options = Object.assign(this.#defaultOptions, options);

    // Update face detector options.
    await this.#faceDetector.setOptions({
      baseOptions: {
        // modelAssetPath: options.modelAssetPath,
        delegate: options.delegate,
      },
      minDetectionConfidence: options.minDetectionConfidence,
    });
  }

  /**
   * Clear the canvas.
   */
  clearCanvas() {
    this.#canvas.getContext('2d').clearRect(0, 0, this.#canvas.width, this.#canvas.height);
  }

  /**
   * Draw the bounding boxes.
   * @param {HTMLCanvasElement} canvas Detection result drawing canvas.
   * @param {HTMLImageElement|HTMLVideoElement} mediaElement Media Element.
   * @param {Detection[]} detections A list of Detections.
   * @param {boolean} clear Whether to clear the canvas. Default is false.
   */
  #drawBoundingBox(detections) {// #drawBoundingBox(detections, clear = false) {
    // Match the dimensions of the canvas on which the bounding box is drawn to the media element.
    const {width, height} = getComputedStyle(this.#mediaElement);
    this.#canvas.width = this.#mediaElement instanceof HTMLImageElement ? this.#mediaElement.naturalWidth : this.#mediaElement.videoWidth;
    this.#canvas.height = this.#mediaElement instanceof HTMLImageElement ? this.#mediaElement.naturalHeight : this.#mediaElement.videoHeight;;
    this.#canvas.style.width = width;
    this.#canvas.style.height = height;

    // if (clear)
    //   // Clear the canvas.
    //   this.clearCanvas();

    // // Save canvas settings
    // this.#canvas.getContext('2d').save();
    for (let {boundingBox} of detections) {
      // Draw a bounding box.
      this.#drawingUtils.drawBoundingBox(boundingBox, {
        color: '#fff',
        fillColor: 'rgba(0, 255, 0, 0.25)',
        lineWidth: 1,
      });
    }

    // // Restote canvas settings
    // this.#canvas.getContext('2d').restore();
  }
}