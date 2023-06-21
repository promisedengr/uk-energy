# usage: export FLASK_APP=server.py && flask run

from flask import Flask, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = 'uploaded_files'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
if not os.path.exists(UPLOAD_FOLDER): os.makedirs(UPLOAD_FOLDER)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/uploads', methods=['POST'])
def upload_file():
  print(' * received form with', list(request.form.items()))
  # check if the post request has the file part
  for file in request.files.getlist('files'):
    if file and file.filename.split('.')[-1].lower() in ALLOWED_EXTENSIONS:
      filename = secure_filename(file.filename)
      file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
      print(' * file uploaded', filename)
  return redirect('/')

@app.route('/')
def hello_world():
  return send_from_directory('.', 'index.html')