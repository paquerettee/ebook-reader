from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from gtts import gTTS
import os
from flask_cors import CORS
from pathlib import Path


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

UPLOAD_FOLDER = 'uploads'
AUDIO_FOLDER = 'audio'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(AUDIO_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['AUDIO_FOLDER'] = AUDIO_FOLDER

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'epub'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/ebooks', methods=['GET'])
def list_ebooks():
    directory = Path(app.config['UPLOAD_FOLDER'])
    files = [f.name for f in directory.iterdir() if f.is_file()]
#    print(f"files: {files}")
    if not files:
        return jsonify({'error': 'No files found', 'files':[]})
    return jsonify({'message': 'Files found', 'files': files}), 200
    

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

    # check if audio file already exists
    safe_filename = secure_filename(filename)
    audio_filename = safe_filename.rsplit('.', 1)[0] + '.mp3'
    audio_path = os.path.join(app.config['AUDIO_FOLDER'], audio_filename)

    if not os.path.exists(audio_path):
        # make an audio
        print("making audio")
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
        if not os.path.exists(filepath):
            return jsonify({'error': 'File not found'}), 404

        with open(filepath, 'r', encoding='utf-8') as f:
           text = f.read().strip()

        if not text:
            return jsonify({'error': 'File is empty or unreadable'}), 400

        try:
            tts = gTTS(text)
            tts.save(audio_path)
        except Exception as e:
            return jsonify({'error': f'TTS failed: {str(e)}'}), 500

    return jsonify({'success': True, 'audio_file': audio_filename}), 200

@app.route('/get-audio', methods=["POST"])
def serve_audio():
    data = request.get_json()
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename is required'}), 400
    return send_from_directory('audio', filename, mimetype='audio/mpeg')

@app.route('/get-ebook', methods=["POST"])
def serve_ebook():
    data = request.get_json()
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename is required'}), 400
    return send_from_directory('uploads', filename, mimetype='text/plain')

@app.route('/delete-ebook', methods=["DELETE"])
def delete_ebook():
    data = request.get_json()
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename is required'}), 400
    # delete ebook if exists
    safe_filename = secure_filename(filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], safe_filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return jsonify({'message': 'File deleted successfully', 'filename': safe_filename}), 200
    else:
        return jsonify({'error': 'File not found'}), 404

@app.route('/delete-audio', methods=["DELETE"])
def delete_audiobook():
    data = request.get_json()
    filename = data.get('filename')
    if not filename:
        return jsonify({'error': 'Filename is required'}), 400
    # delete audiobook if exists
    safe_filename = secure_filename(filename)
    filepath = os.path.join(app.config['AUDIO_FOLDER'], safe_filename)
    if os.path.exists(filepath):
        os.remove(filepath)
        return jsonify({'message': 'File deleted successfully', 'filename': safe_filename}), 200
    else:
       return jsonify({'message': 'Nothing to delete - file not found'}), 200

@app.route('/')
def home():
    return "🚀 Flask is running!"

if __name__ == '__main__':
    app.run(debug=True)