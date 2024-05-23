import face_recognition
from PIL import Image, ImageDraw

MODEL_URL = 'public/models/'

def main():
    # Cargar los modelos necesarios
    face_recognition.load_image_file(MODEL_URL + 'ssd_mobilenetv1_model.pb')
    face_recognition.load_image_file(MODEL_URL + 'face_expression_model.pb')

    # Cargar la imagen
    image_path = 'public/images/images.jpg'
    image = face_recognition.load_image_file(image_path)

    # Detectar rostros y expresiones faciales
    face_locations = face_recognition.face_locations(image)
    face_landmarks_list = face_recognition.face_landmarks(image)
    face_encodings = face_recognition.face_encodings(image)

    # Crear un lienzo para dibujar sobre la imagen
    pil_image = Image.fromarray(image)
    draw = ImageDraw.Draw(pil_image)

    for (top, right, bottom, left), landmarks, encoding in zip(face_locations, face_landmarks_list, face_encodings):
        # Dibujar el cuadro del rostro
        draw.rectangle(((left, top), (right, bottom)), outline=(255, 0, 0))

        # Dibujar los puntos de referencia faciales
        for facial_feature in landmarks.keys():
            draw.point(landmarks[facial_feature], fill=(0, 255, 0))

    # Mostrar la imagen resultante
    pil_image.show()

if __name__ == "__main__":
    main()
