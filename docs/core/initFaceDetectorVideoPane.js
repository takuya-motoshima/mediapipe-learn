import {Pane} from '../node_modules/tweakpane/dist/tweakpane.min.js';
import * as TweakpaneThumbnailListPlugin from '../node_modules/tweakpane-plugin-thumbnail-list/dist/tweakpane-plugin-thumbnail-list.min.js';

/**
 * Initialize the face detector Pane in the video.
 * @param {TpChangeEvent => {}} handleChange Pane change event handler.
 * @see {@link https://tweakpane.github.io/docs/api/classes/TpChangeEvent.html|TpChangeEvent}
 */
export default (handleChange) => {
  // Options.
  const options = {
    delegate: 'GPU',
    model: 'models/blaze_face_short_range.tflite',
    minDetectionConfidence: 0.5,
    video: 'img/video1_landscape.mp4',
  }

  // New Pane instance.
  const pane = new Pane({
    title: 'Options',
    // expanded: false,
  });
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
  const videoOptions = pane.addBinding(options, 'video', {
    label: 'Video',
    view: 'thumbnail-list',
    options: [
      {text: 'Video1(Landscape)', value: 'img/video1_landscape.mp4', src: 'img/video1_landscape.jpg'},
      {text: 'Video1(Portrait)', value: 'img/video1_portrait.mp4', src: 'img/video1_portrait.jpg'},
      {text: 'Video2', value: 'img/video2.mp4', src: 'img/video2.jpg'},
      {text: 'Video3', value: 'img/video3.mp4', src: 'img/video3.jpg'},
    ]
  });

  // Remove the None option from the sample pulldown.
  // Since TweakpaneThumbnailListPlugin creates the none option on its own, I had no choice but to remove it manually.
  for (let option of videoOptions.element.querySelectorAll('.tp-thumbv_opt')) {
    if (option.dataset.value)
      continue;
    option.remove();
    break;
  }

  // Back button.
  pane
    .addButton({title: 'Back to HOME'})
    .on('click', () => {
      location.href = './';
    });

  // Pane change event.
  pane.on('change', handleChange);
  return {pane, options};
}