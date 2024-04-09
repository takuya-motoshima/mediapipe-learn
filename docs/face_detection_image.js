import FaceDetector from './core/FaceDetector.js';
import initFaceDetectorImagePane from './core/initFaceDetectorImagePane.js';

(async () => {
  // Initialize Pane.
  const {_, options} = initFaceDetectorImagePane(async evnt => {
    if (!evnt.last)
      return;

    // Clear the canvas.
    faceDetector.clearCanvas();

    // Change the sample.
    faceDetector.mediaElement.src = options.image.src;

    // Wait until the sample is loaded.
    await new Promise(resolve => image.onload = resolve);

    // Update face detector options.
    await faceDetector.updateOptions({
      delegate: options.delegate,
      minDetectionConfidence: options.minDetectionConfidence,
    });

    // Face detection.
    faceDetector.detectFaces();
  });

  // New instance of the face detector.
  const faceDetector = new FaceDetector(document.getElementById('image'), document.getElementById('canvas'), {
    delegate: options.delegate,
    runningMode: 'IMAGE',
    minDetectionConfidence: options.minDetectionConfidence,
  });

  // Initialize face detector.
  await faceDetector.init();

  // Face detection.
  faceDetector.detectFaces();
})();