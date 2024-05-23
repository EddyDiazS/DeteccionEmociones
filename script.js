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

            // Esperar a que la imagen se cargue completamente
            const image = new Image();
            image.onload = async () => {
                // Ajustar el tamaño del canvas a la imagen
                canvas.width = image.width;
                canvas.height = image.height;

                // Dibujar la imagen en el canvas
                ctx.drawImage(image, 0, 0);

                // Detectar todas las caras y sus expresiones en la imagen
                let fullFaceDescriptions = await faceapi.detectAllFaces(canvas).withFaceExpressions();

                // Limpiar el canvas antes de dibujar
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Dibujar la imagen y luego las detecciones y las expresiones faciales en el canvas
                ctx.drawImage(image, 0, 0);
                faceapi.draw.drawDetections(canvas, fullFaceDescriptions);
                faceapi.draw.drawFaceExpressions(canvas, fullFaceDescriptions, 0.5); // Puedes ajustar el umbral aquí si lo deseas
            };

            // Asignar la URL de la imagen para que se inicie la carga
            image.src = imageURL;
        }
    });
})();
