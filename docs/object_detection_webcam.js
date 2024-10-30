import ObjectDetector from './core/ObjectDetector.js';
import initObjectDetectorPane from './core/initObjectDetectorPane.js';

(async () => {
  /**
   * Repeated object detection.
   */
  const renderLoop = () => {
    // Detect.
    detector.detect();

    // Repeat object detection.
    requestId = requestAnimationFrame(renderLoop);
  }

  // Initialize Pane.
  const options = initObjectDetectorPane(async () => {
    // Clear the canvas.
    detector.clearCanvas();

    // Stop repeated detection.
    cancelAnimationFrame(requestId)

    // Video loaded event.
    detector.mediaElement.addEventListener('loadeddata', async () => {
      // Update detector options.
      await detector.updateOptions({
        delegate: options.delegate,
        maxResults: options.maxResults,
        scoreThreshold: options.scoreThreshold,
      });

      // Start detecting objects repeatedly.
      renderLoop();
    }, {once: true});
});

  // Request ID.
  let requestId;

  // New instance of the object detector.
  const detector = new ObjectDetector(document.getElementById('webcam'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'VIDEO',
    maxResults: options.maxResults,
    scoreThreshold: options.scoreThreshold,
  });

  // Initialize object detector.
  await detector.init();

  // Video loaded event.
  detector.mediaElement.addEventListener('loadeddata', () => {
    // Start detecting objects repeatedly.
    renderLoop();
  }, {once: true});
})();