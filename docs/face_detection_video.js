import FaceDetector from './core/FaceDetector.js';
import initFaceDetectorVideoPane from './core/initFaceDetectorVideoPane.js';

(async () => {
  /**
   * Repeated face detection.
   */
  const renderLoop = () => {
    // Face detection.
    faceDetector.detectFaces();

    // Repeat face detection.
    requestId = requestAnimationFrame(renderLoop);
  }

  // Initialize Pane.
  const {_, options} = initFaceDetectorVideoPane(async evnt => {
    if (!evnt.last)
      return;

    // Clear the canvas.
    faceDetector.clearCanvas();

    // Stop repeated detection.
    cancelAnimationFrame(requestId)

    // Change the sample.
    faceDetector.mediaElement.src = options.video.value;

    // Video loaded event.
    faceDetector.mediaElement.addEventListener('loadeddata', async () => {
      // Update face detector options.
      await faceDetector.updateOptions({
        delegate: options.delegate,
        minDetectionConfidence: options.minDetectionConfidence,
      });

      // Start detecting faces repeatedly.
      renderLoop();
    }, {once: true});
  });

  // Request ID.
  let requestId;

  // New instance of the face detector.
  const faceDetector = new FaceDetector(document.getElementById('video'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'VIDEO',
    minDetectionConfidence: options.minDetectionConfidence,
  });

  // Initialize face detector.
  await faceDetector.init();

  // Video loaded event.
  faceDetector.mediaElement.addEventListener('loadeddata', () => {
    // Start detecting faces repeatedly.
    renderLoop();
  }, {once: true});

  // Explicitly load video in case the loadeddata event does not fire.
  faceDetector.mediaElement.load();
})();