import {Pane} from '../node_modules/tweakpane/dist/tweakpane.min.js';
import * as TweakpaneThumbnailListPlugin from '../node_modules/tweakpane-plugin-thumbnail-list/dist/tweakpane-plugin-thumbnail-list.min.js';

/**
 * Initialize Face Detection Pane.
 * @param {'image'|'video'|'webcam'} Type.
 * @param {TpChangeEvent => {}} handleChange Pane change event handler.
 * @return {any} Options.
 * @see {@link https://tweakpane.github.io/docs/api/classes/TpChangeEvent.html|TpChangeEvent}
 */
export default (type = 'image', handleChange)  => {
  // Options.
  const options = {
    delegate: 'GPU',
    model: 'models/blaze_face_short_range.tflite',
    minDetectionConfidence: 0.5,
  }

  // Set default options for each type.
  if (type === 'image')
    options.image = 'img/photo1.jpg';
  else if (type === 'video')
    options.video = 'img/video1_landscape.mp4';

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
      'BlazeFace(short-range)': 'models/blaze_face_short_range.tflite',
      // 'BlazeFace(full-range)': '',
      // 'BlazeFace Sparse(full-range)': '',
    },
  });

  // Score Threshold Slider.
  pane.addBinding(options, 'minDetectionConfidence', {
    label: 'Score Threshold',
    step: 0.1,
    min: 0,
    max: 1,
    interval: 1000,
  });

  // Sample pull-down.
  let sampleOptions;
  if (type === 'image')
    sampleOptions = pane.addBinding(options, 'image', {
      label: 'Image',
      view: 'thumbnail-list',
      options: [
        {text: 'Photo1', value: 'img/photo1.jpg', src: 'img/photo1.jpg'},
        {text: 'Photo2', value: 'img/photo2.jpg', src: 'img/photo2.jpg'},
        {text: 'Photo3', value: 'img/photo3.jpg', src: 'img/photo3.jpg'},
        {text: 'Photo4', value: 'img/photo4.jpg', src: 'img/photo4.jpg'},
        {text: 'Photo5', value: 'img/photo5.jpg', src: 'img/photo5.jpg'},
        {text: 'Photo6', value: 'img/photo6.jpg', src: 'img/photo6.jpg'},
        {text: 'Photo7', value: 'img/photo7.jpg', src: 'img/photo7.jpg'},
      ]
    });
  else if (type === 'video')
    sampleOptions = pane.addBinding(options, 'video', {
      label: 'Video',
      view: 'thumbnail-list',
      options: [
        {text: 'Video1(Landscape)', value: 'img/video1_landscape.mp4', src: 'img/video1_landscape.jpg'},
        {text: 'Video1_2(Portrait)', value: 'img/video1_landscape_2.mp4', src: 'img/video1_landscape_2.jpg'},
        {text: 'Video1(Portrait)', value: 'img/video1_portrait.mp4', src: 'img/video1_portrait.jpg'},
        {text: 'Video2', value: 'img/video2.mp4', src: 'img/video2.jpg'},
        {text: 'Video3', value: 'img/video3.mp4', src: 'img/video3.jpg'},
      ]
    });

  // Remove the None option from the sample pulldown.
  // Since TweakpaneThumbnailListPlugin creates the none option on its own, I had no choice but to remove it manually.
  if (sampleOptions) {
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