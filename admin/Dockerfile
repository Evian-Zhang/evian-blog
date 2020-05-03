FROM python:alpine

WORKDIR /app

COPY ./action.py ./action.py
COPY ./db_main.py ./db_main.py
COPY requirements.txt ./requirements.txt

RUN ["pip", "install", "-r", "requirements.txt"]

VOLUME /img