FROM node:alpine AS build

WORKDIR /app

COPY frontend/package.json ./frontend/package.json
RUN cd frontend && npm install
COPY frontend ./frontend
RUN cd frontend && npm run build

COPY backend/package.json ./backend/package.json
RUN cd backend && npm install && npm run build
COPY backend ./backend

RUN mkdir -p /app/backend/public
RUN cp -r /app/frontend/dist /app/backend/public

EXPOSE 3000
CMD ["npm", "start", "--prefix", "/app/backend"]