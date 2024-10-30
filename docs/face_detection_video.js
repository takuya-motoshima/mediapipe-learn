import FaceDetector from './core/FaceDetector.js';
import initFaceDetectorPane from './core/initFaceDetectorPane.js';

(async () => {
  /**
   * Repeated face detection.
   */
  const renderLoop = () => {
    // Detect.
    detector.detect();

    // Repeat face detection.
    requestId = requestAnimationFrame(renderLoop);
  }

  // Initialize Pane.
  const options = initFaceDetectorPane('video', async () => {
    // Clear the canvas.
    detector.clearCanvas();

    // Stop repeated detection.
    cancelAnimationFrame(requestId)

    // Change the sample.
    detector.mediaElement.src = options.video.value;

    // Video loaded event.
    detector.mediaElement.addEventListener('loadeddata', async () => {
      // Update detector options.
      await detector.updateOptions({
        delegate: options.delegate,
        minDetectionConfidence: options.minDetectionConfidence,
      });

      // Start detecting faces repeatedly.
      renderLoop();
    }, {once: true});
  });

  // Request ID.
  let requestId;

  // New instance of the detector.
  const detector = new FaceDetector(document.getElementById('video'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'VIDEO',
    minDetectionConfidence: options.minDetectionConfidence,
  });

  // Initialize detector.
  await detector.init();

  // Video loaded event.
  detector.mediaElement.addEventListener('loadeddata', () => {
    // Start detecting faces repeatedly.
    renderLoop();
  }, {once: true});

  // Explicitly load video in case the loadeddata event does not fire.
  detector.mediaElement.load();
})();