/**
 * Open the camera.
 * @param {HTMLVideoElement} video The video element.
 * @param {boolean} front Whether to use the front camera.
 */
export default (video, front = true) => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: front ? 'user' : 'environment'
        },
        audio: false,
      })
      .then(stream => {
        video.srcObject = stream;
        video.addEventListener('loadeddata', resolve);
      })
      .catch(err => {
        reject(err);
      });
  });
}