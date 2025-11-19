running flask backend:
 1. cd ebook-reader-backend
 2. python app.py
 3. http://localhost:5000

running react frontend
 1. cd ebook-reader-frontend
 2. npm run dev
 3. http://localhost:5173/


adding new packeges to backend so that render.com deployment works:
python -m gunicorn --version
python -m pip freeze > requirements.txt
