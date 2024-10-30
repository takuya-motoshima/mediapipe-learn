import FaceDetector from './core/FaceDetector.js';
import initFaceDetectorPane from './core/initFaceDetectorPane.js';

(async () => {
  // Initialize Pane.
  const options = initFaceDetectorPane('image', async () => {
    // Clear the canvas.
    detector.clearCanvas();

    // Change the sample.
    detector.mediaElement.src = options.image.src;

    // Wait until the sample is loaded.
    await new Promise(resolve => image.onload = resolve);

    // Update detector options.
    await detector.updateOptions({
      delegate: options.delegate,
      minDetectionConfidence: options.minDetectionConfidence,
    });

    // Detect.
    detector.detect();
  });

  // New instance of the detector.
  const detector = new FaceDetector(document.getElementById('image'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'IMAGE',
    minDetectionConfidence: options.minDetectionConfidence,
  });

  // Initialize detector.
  await detector.init();

  // Detect.
  detector.detect();
})();