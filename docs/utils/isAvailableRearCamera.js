/**
 * Check if the rear camera is available.
 * @return {Promise<boolean>} Whether the rear camera is available.
 */
export default async () => {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({video: {facingMode: 'environment'}})
      .then(stream => {
        // Rear camera is available.
        // Stop the stream.
        stream.getTracks().forEach(track => track.stop());
        resolve(true);
      })
      .catch(err => {
        switch(err.name) {
        case 'NotReadableError':
          // Rear camera is not available.
          resolve(false);
          break;
        case 'NotAllowedError':
        default:
          // Camera is not allowed or unknown error.
          reject(err);
        }
      });
  });
}