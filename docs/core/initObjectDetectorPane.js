import {Pane} from '../node_modules/tweakpane/dist/tweakpane.min.js';
import * as TweakpaneThumbnailListPlugin from '../node_modules/tweakpane-plugin-thumbnail-list/dist/tweakpane-plugin-thumbnail-list.min.js';

/**
 * Initialize Object Detection Pane.
 * @param {'image'|'webcam'} Type.
 * @param {TpChangeEvent => {}} handleChange Pane change event handler.
 * @return {any} Options.
 * @see {@link https://tweakpane.github.io/docs/api/classes/TpChangeEvent.html|TpChangeEvent}
 */
export default (type = 'image', handleChange) => {
  // Options.
  const options = {
    delegate: 'GPU',
    model: 'models/efficientdet_lite0_float16.tflite',
    maxResults: 1,
    scoreThreshold: 0.5,
  }

  // Set default options for each type.
  if (type === 'image')
    options.image = 'img/doggo.jpg';
    // options.image = 'img/card1.jpg';

  // New Pane instance.
  const pane = new Pane({title: 'Options'});

  // Add plugin.
  pane.registerPlugin(TweakpaneThumbnailListPlugin);

  // Processor pulldown.
  pane.addBinding(options, 'delegate', {
    label: 'Processor',
    options: {
      'GPU(high speed)': 'GPU',
      'CPU(low speed)': 'CPU',
    },
  });

  // Model pulldown.
  pane.addBinding(options, 'model', {
    label: 'Model',
    options: {
      'EfficientDet-Lite0(int8)': 'models/efficientdet_lite0_int8.tflite',
      'EfficientDet-Lite0(float 16)': 'models/efficientdet_lite0_float16.tflite',
      'EfficientDet-Lite0(float 32)': 'models/efficientdet_lite0_float32.tflite',
      'EfficientDet-Lite2(int8)': 'models/efficientdet_lite2_int8.tflite',
      'EfficientDet-Lite2(float 16)': 'models/efficientdet_lite2_float16.tflite',
      'EfficientDet-Lite2(float 32)': 'models/efficientdet_lite2_float32.tflite',
      'SSD MobileNetV2(int8)': 'models/ssd_mobilenet_v2_int8.tflite',
      'SSD MobileNetV2(float 32)': 'models/ssd_mobilenet_v2_float32.tflite',
    },
  });

  // Maximum number of detections slider.
  pane.addBinding(options, 'maxResults', {
    label: 'Maximum Results',
    step: 1,
    min: 1,
    max: 5,
    interval: 1000,
  });

  // Score Threshold Slider.
  pane.addBinding(options, 'scoreThreshold', {
    label: 'Score Threshold',
    step: 0.1,
    min: 0,
    max: 1,
    interval: 1000,
  });


// Sample pull-down.
  if (type === 'image') {
    const sampleOptions = pane.addBinding(options, 'image', {
      label: 'Image',
      view: 'thumbnail-list',
      options: [
        {text: 'Doggo', value: 'img/doggo.jpg', src: 'img/doggo.jpg'},
        {text: 'Card1', value: 'img/card1.jpg', src: 'img/card1.jpg'},
        {text: 'Card2', value: 'img/card2.jpg', src: 'img/card2.jpg'},
        {text: 'Card3', value: 'img/card3.jpg', src: 'img/card3.jpg'},
        {text: 'Card4', value: 'img/card4.jpg', src: 'img/card4.jpg'},
        {text: 'Card5', value: 'img/card5.jpg', src: 'img/card5.jpg'},
        {text: 'Card6', value: 'img/card6.jpg', src: 'img/card6.jpg'},
        {text: 'Card7', value: 'img/card7.jpg', src: 'img/card7.jpg'},
        {text: 'Card8', value: 'img/card8.jpg', src: 'img/card8.jpg'},
        {text: 'Card9', value: 'img/card9.jpg', src: 'img/card9.jpg'},
        {text: 'Card10', value: 'img/card10.jpg', src: 'img/card10.jpg'},
        {text: 'Card11', value: 'img/card11.jpg', src: 'img/card11.jpg'},
        {text: 'Card12', value: 'img/card12.jpg', src: 'img/card12.jpg'},
        {text: 'Card13', value: 'img/card13.jpg', src: 'img/card13.jpg'},
        {text: 'Card14', value: 'img/card14.jpg', src: 'img/card14.jpg'},
        {text: 'Card15', value: 'img/card15.jpg', src: 'img/card15.jpg'},
        {text: 'Card16', value: 'img/card16.jpg', src: 'img/card16.jpg'},
        {text: 'Card17', value: 'img/card17.jpg', src: 'img/card17.jpg'},
        {text: 'Card18', value: 'img/card18.jpg', src: 'img/card18.jpg'},
        {text: 'Card19', value: 'img/card19.jpg', src: 'img/card19.jpg'},
        {text: 'Card20', value: 'img/card20.jpg', src: 'img/card20.jpg'},
        {text: 'Card21', value: 'img/card21.jpg', src: 'img/card21.jpg'},
        {text: 'Card22', value: 'img/card22.jpg', src: 'img/card22.jpg'},
        {text: 'Card23', value: 'img/card23.jpg', src: 'img/card23.jpg'},
        {text: 'Card24', value: 'img/card24.jpg', src: 'img/card24.jpg'},
        {text: 'Card25', value: 'img/card25.jpg', src: 'img/card25.jpg'},
        {text: 'Card26', value: 'img/card26.jpg', src: 'img/card26.jpg'},
        {text: 'Card27', value: 'img/card27.jpg', src: 'img/card27.jpg'},
        {text: 'Card28', value: 'img/card28.jpg', src: 'img/card28.jpg'},
        {text: 'Card29', value: 'img/card29.jpg', src: 'img/card29.jpg'},
        {text: 'Card30', value: 'img/card30.jpg', src: 'img/card30.jpg'},
        {text: 'Card31', value: 'img/card31.jpg', src: 'img/card31.jpg'},
        {text: 'Card32', value: 'img/card32.jpg', src: 'img/card32.jpg'},
        {text: 'Card33', value: 'img/card33.jpg', src: 'img/card33.jpg'},
        {text: 'Card34', value: 'img/card34.jpg', src: 'img/card34.jpg'},
        {text: 'Card35', value: 'img/card35.jpg', src: 'img/card35.jpg'},
        {text: 'Card36', value: 'img/card36.jpg', src: 'img/card36.jpg'},
        {text: 'Card37', value: 'img/card37.jpg', src: 'img/card37.jpg'},
        {text: 'Card38', value: 'img/card38.jpg', src: 'img/card38.jpg'},
        {text: 'Card39', value: 'img/card39.jpg', src: 'img/card39.jpg'},
      ]
    });

    // Remove the None option from the sample pulldown.
    // Since TweakpaneThumbnailListPlugin creates the none option on its own, I had no choice but to remove it manually.
    for (let option of sampleOptions.element.querySelectorAll('.tp-thumbv_opt')) {
      if (option.dataset.value)
        continue;
      option.remove();
      break;
    }
  }

  // Back button.
  pane
    .addButton({title: 'Back to HOME'})
    .on('click', () => {
      location.href = './';
    });

  // Pane change event.
  pane.on('change', evnt => {
    if (!evnt.last)
      return;
    handleChange(evnt);
  });
  return options;
}