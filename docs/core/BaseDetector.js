import {FilesetResolver, DrawingUtils} from './vision_bundle.js';
// import {FilesetResolver, DrawingUtils} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0';

/**
 * Base class for detectors.
 */
export default class {
  /**
   * Media Element.
   * @protected
   * @type {HTMLImageElement|HTMLVideoElement}
   */
  mediaElement;

  /**
   * Detection result drawing canvas.
   * @protected
   * @type {HTMLCanvasElement}
   */
  canvas;

  /**
   * Drawing tool instance.
   * @protected
   * @type {DrawingUtils}
   */
  drawingUtils;

  /**
   * Getter to retrieve the Media Element.
   * @public
   * @return {HTMLImageElement|HTMLVideoElement} Media Element.
   */
  get mediaElement() {
    return this.mediaElement;
  }

  /**
   * @param {HTMLImageElement|HTMLVideoElement} mediaElement Media Element.
   * @param {HTMLCanvasElement} canvas Detection result drawing canvas.
   */
  constructor(mediaElement, canvas) {
    // Save media elements and canvas elements.
    this.mediaElement = mediaElement;
    this.canvas = canvas; 

    // Drawing tool instance.
    this.drawingUtils = new DrawingUtils(canvas.getContext('2d'));

    // Match the dimensions of the canvas on which the bounding box is drawn to the media element.
    const {objectFit, objectPosition} = getComputedStyle(this.mediaElement);
    this.canvas.style.objectFit = objectFit;
    this.canvas.style.objectPosition = objectPosition;
  }

  /**
   * Clear the canvas.
   * @public
   */
  clearCanvas() {
    this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Creates a fileset for the MediaPipe Vision tasks.
   * @protected
   * @return {Promise<WasmFileset>} WasmFileset.
   */
  async forVisionTasks() {
    const vision = await FilesetResolver.forVisionTasks(
      // path/to/wasm/root
      'node_modules/@mediapipe/tasks-vision/wasm'
    );
    return vision;
  }

  /**
   * Draw the bounding boxes.
   * @protected
   * @param {HTMLCanvasElement} canvas Detection result drawing canvas.
   * @param {HTMLImageElement|HTMLVideoElement} mediaElement Media Element.
   * @param {Detection[]} detections A list of Detections.
   * @param {boolean} clear Whether to clear the canvas. Default is false.
   */
  drawBoundingBox(detections) {
    // Match the dimensions of the canvas on which the bounding box is drawn to the media element.
    const {width, height} = getComputedStyle(this.mediaElement);
    this.canvas.width = this.mediaElement instanceof HTMLImageElement ? this.mediaElement.naturalWidth : this.mediaElement.videoWidth;
    this.canvas.height = this.mediaElement instanceof HTMLImageElement ? this.mediaElement.naturalHeight : this.mediaElement.videoHeight;;
    this.canvas.style.width = width;
    this.canvas.style.height = height;

    // console.log('detections=', detections);

    // // Save canvas settings
    // this.canvas.getContext('2d').save();
    for (let {boundingBox} of detections) {
      // Draw a bounding box.
      this.drawingUtils.drawBoundingBox(boundingBox, {
        color: '#fff',
        fillColor: 'rgba(0, 255, 0, 0.25)',
        lineWidth: 1,
      });
    }

    // // Restote canvas settings
    // this.canvas.getContext('2d').restore();
  }
}