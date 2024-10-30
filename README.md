# MediaPipe Learn

This is the learning result of MediaPipe.   
Check out the latest MediaPipe browser demo [here](https://takuya-motoshima.github.io/mediapipe-learn/).    
The code for those browser demos can be found [here](https://github.com/takuya-motoshima/mediapipe-learn/tree/main/docs).  

![screencaps/docs.jpg](screencaps/docs.jpg)

## What is MediaPipe?  
It is a framework developed by Google with machine learning and image processing capabilities.

## What is WASM?  
Specification of stack-based virtual machines and the binaries that run in them. Virtual machines can be broadly classified into the following two types, and WASM falls into the Process VM category.  
- System VM  
    A virtual environment that simulates a physical computer.  
    Examples: VirtualBox, VMware, etc.
- Process VM  
    A virtual environment for running applications.  
    In a broad sense, the OS's presentation of resources to a process through virtual memory is also a Process VM.

    A WASM virtual machine is simply a virtual machine that runs `WASM binary files.  
    Google Chrome has a built-in virtual machine called V8, and WASM runs on V8.

## Sample
This package contains demos of the following features.  
Click on the link to check out the demo.
- [Face detection (image)](https://takuya-motoshima.github.io/mediapipe-learn/face_detection_image.html)
- [Face detection (video)](https://takuya-motoshima.github.io/mediapipe-learn/face_detection_video.html)
- [Object detection (image)](https://takuya-motoshima.github.io/mediapipe-learn/object_detection_image.html)
- [Object detection (webcam)](https://takuya-motoshima.github.io/mediapipe-learn/object_detection_webcam.html)
<!-- - Facial landmark detection -->

You can start the Docker container and open [http://localhost:8080/](http://localhost:8080/) in a browser to see the sample.
```sh
docker-compose up -d
```

## Troubleshooting
- wasm streaming compile failed: TypeError: Failed to execute 'compile' on 'WebAssembly': Incorrect response MIME type. Expected 'application/wasm'.  
    Adding a `WASM` MIME type and extension mapping to the web server will solve this problem.  

    For Nginx, add the following to `/etc/nginx/mime.types`.
    ```nginx
    application/wasm wasm;
    ```

## Reference
- [MediaPipe API Reference](https://developers.google.com/mediapipe/api/solutions/js/tasks-vision)
- [Face detection guide for Web](https://developers.google.com/mediapipe/solutions/vision/face_detector/web_js)
- [Face detection model here](https://developers.google.com/mediapipe/solutions/vision/face_detector/index#models)
- [Object detection guide for Web](https://developers.google.com/mediapipe/solutions/vision/object_detector/web_js)
- [Object detection model here](https://developers.google.com/mediapipe/solutions/vision/object_detector/index#models)
- [Face detection example (CodePen))](https://codepen.io/mediapipe-preview/pen/OJByWQr)
- [Object detection example (CodePen)](https://codepen.io/mediapipe-preview/pen/vYrWvNg)
- [Object detection model customization guide](https://developers.google.com/mediapipe/solutions/customization/object_detector)
<!-- - [Detailed description of the BlazeFace model (Japanese)](https://medium.com/axinc/blazeface-%E9%A1%94%E3%81%AE%E4%BD%8D%E7%BD%AE%E3%81%A8%E3%82%AD%E3%83%BC%E3%83%9D%E3%82%A4%E3%83%B3%E3%83%88%E3%82%92%E9%AB%98%E9%80%9F%E3%81%AB%E6%A4%9C%E5%87%BA%E3%81%99%E3%82%8B%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92%E3%83%A2%E3%83%87%E3%83%AB-e851c348a32b) -->

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)






## MediaPipeモデルメーカーで既存の物体検出をカスタム

サンプル:
https://colab.research.google.com/github/googlesamples/mediapipe/blob/main/tutorials/object_detection/Object_Detection_for_3_dogs.ipynb#scrollTo=jrmj83afDJrv

