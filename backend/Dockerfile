FROM python:3.8-buster

COPY . /app
WORKDIR /app

ENV FLASK_APP=app/app.py
ENV FLASK_ENV=development

COPY ./requirements.txt .

RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python3", "app.py"]

