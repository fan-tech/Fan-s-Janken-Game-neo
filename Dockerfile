# Build Frontend Staticfiles
FROM node:14.15.1-stretch as front-build

WORKDIR /frontend
COPY ./frontend /frontend

RUN yarn install
RUN yarn build  # frontend/dist にビルドされる

# Build Backend Django Packages
FROM python:3.8.6-buster
WORKDIR /backend

COPY ./backend /backend
COPY --from=front-build /frontend/dist /frontend/dist

RUN pip install --no-cache-dir -q -r requirements.txt

CMD gunicorn config.wsgi:application --bind 0.0.0.0:$PORT  # $PORTは実行時の環境変数から取得される
