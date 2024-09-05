import * as tf from '@tensorflow/tfjs';

// Load TensorFlow.js model
export async function loadModel() {
  try {
    const model = await tf.loadLayersModel('../../model/model.json'); 
    console.log('Model loaded successfully');
    console.log(model.summary());
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

// Predict congestion level using TensorFlow.js model
export async function predictCongestion(inputData, model) {
  try {
    // Create a 2D tensor from input data
    const inputTensor = tf.tensor2d([[
        inputData.temperature,
        inputData.humidity,
        inputData.wind_speed,
        inputData.hour,
        inputData.isWeekend
      ]], [1, 5]); 

    // Make prediction using the model
    const prediction = model.predict(inputTensor);
    const congestionLevel = prediction.dataSync()[0]; 
    return congestionLevel;
  } catch (error) {
    console.error('Error making prediction:', error);
  }
}
