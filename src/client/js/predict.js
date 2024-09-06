import * as tf from '@tensorflow/tfjs';

let model; 

// Function to dispose of any existing model before loading a new one
function disposeModel() {
  if (model) {
    model.dispose(); 
    model = null;
  }
}

// Function to load the TensorFlow.js model only once
export async function loadModel() {
  try {
    // Check if the model is already loaded
    if (!model) {
      console.log('Loading model...');
      disposeModel(); // Ensure any existing model is disposed of
      model = await tf.loadLayersModel('../../model/model.json');
      console.log('Model loaded successfully');
      model.summary();
    }
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

// Function to predict congestion using the loaded model
export async function predictCongestion(inputData) {
  try {
    if (!model) {
      // If model isn't loaded, load it
      await loadModel();
    }

    // Prepare input tensor
    const inputTensor = tf.tensor2d([[
      inputData.temperature,
      inputData.humidity,
      inputData.wind_speed,
      inputData.hour,
      inputData.isWeekend
    ]], [1, 5]);

    // Make prediction
    const prediction = model.predict(inputTensor);
    const congestionLevel = prediction.dataSync()[0];

    // Dispose of input tensor and prediction to prevent memory leaks
    inputTensor.dispose();
    prediction.dispose();

    return congestionLevel;
  } catch (error) {
    console.error('Error making prediction:', error);
  }
}

