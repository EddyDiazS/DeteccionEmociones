const MODEL_URL = 'models';

(async () => {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);

    const fileInput = document.getElementById('file-input');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);

            const image = new Image();
            image.onload = async () => {
                
                canvas.width = image.width;
                canvas.height = image.height;

                ctx.drawImage(image, 0, 0);

                let fullFaceDescriptions = await faceapi.detectAllFaces(canvas).withFaceExpressions();

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
                faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
                faceapi.draw.drawFaceExpressions(canvas, fullFaceDescriptions, 0.5);
            };

            image.src = imageURL;
        }
    });
})();
