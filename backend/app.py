from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from gtts import gTTS
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
AUDIO_FOLDER = 'audio'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['AUDIO_FOLDER'] = AUDIO_FOLDER


ALLOWED_EXTENSIONS = {'txt', 'pdf', 'epub'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200

    return jsonify({'error': 'Invalid file type'}), 400

@app.route('/generate-audio', methods=['POST'])
def generate_audio():
    data = request.get_json()
    filename = data.get('filename')

    if not filename:
        return jsonify({'error': 'Filename is required'}), 400

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename))
    if not os.path.exists(filepath):
        return jsonify({'error': 'File not found'}), 404

    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read().strip()

    if not text:
        return jsonify({'error': 'File is empty or unreadable'}), 400

    try:
        tts = gTTS(text)
        audio_filename = filename.rsplit('.', 1)[0] + '.mp3'
        audio_path = os.path.join(app.config['AUDIO_FOLDER'], audio_filename)
        tts.save(audio_path)
    except Exception as e:
        return jsonify({'error': f'TTS failed: {str(e)}'}), 500

    return send_file(audio_path, as_attachment=True)


@app.route('/')
def home():
    return "🚀 Flask is running!"

if __name__ == '__main__':
    app.run(debug=True)