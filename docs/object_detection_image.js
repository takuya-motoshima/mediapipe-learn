import ObjectDetector from './core/ObjectDetector.js';
import initObjectDetectorPane from './core/initObjectDetectorPane.js';

(async () => {
  // Initialize Pane.
  const options = initObjectDetectorPane('image', async () => {
    // Clear the canvas.
    detector.clearCanvas();

    // Change the sample.
    detector.mediaElement.src = options.image.src;

    // Wait until the sample is loaded.
    await new Promise(resolve => image.onload = resolve);

    // Update detector options.
    await detector.updateOptions({
      delegate: options.delegate,
      maxResults: options.maxResults,
      scoreThreshold: options.scoreThreshold,
    });

    // Detect.
    detector.detect();
  });

  // New instance of the detector.
  const detector = new ObjectDetector(document.getElementById('image'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'IMAGE',
    maxResults: options.maxResults,
    scoreThreshold: options.scoreThreshold,
  });

  // Initialize detector.
  await detector.init();

  // Detect.
  detector.detect();
})();