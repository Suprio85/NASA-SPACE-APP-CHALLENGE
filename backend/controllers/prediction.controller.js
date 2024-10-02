import path from 'path'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url';
import asyncHandler from 'express-async-handler'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const predictExoplanetType = asyncHandler(async (req, res) => {
    const { mass, radius, orbital } = req.body;

    const pathDir = path.join(__dirname, "..", 'scripts', 'predict.py');
    console.log(pathDir);
    
    const pythonProcess = spawn('python', [pathDir, mass, radius, orbital]);

    let predictionResult = '';
    let errorOccurred = false;

    // Capture stdout data
    pythonProcess.stdout.on('data', (data) => {
        predictionResult += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        errorOccurred = true;
    });

    // When the Python script finishes
    pythonProcess.on('close', (code) => {
        console.log(`Python script exited with code ${code}`);
        
        if (errorOccurred) {
            return res.status(500).json({ message: "Error in prediction" });
        }

        // Only return the final prediction to the client
        const outputLines = predictionResult.trim().split('\n');
        const finalPrediction = outputLines[outputLines.length - 1];  // Get the last line, which should be the prediction
        console.log(`Final prediction: ${finalPrediction}`);

        res.json({ prediction: finalPrediction });
    });
});

export { predictExoplanetType };