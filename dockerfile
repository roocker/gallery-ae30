FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json .

# Install deps
# FROM base AS prod-deps
# RUN npm install --omit=dev
FROM base AS build-deps
RUN npm install 

# Build 
FROM build-deps AS build
COPY . .
ENV NODE_OPTIONS=--max_old_space_size=4096 
RUN npm run build

# RUN nginx
FROM nginx:alpine AS runtime
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT=8080
EXPOSE 8080

# -------
## RUN node
# FROM base AS runtime
# COPY --from=build /app/dist ./dist
# RUN addgroup --system --gid 12232 lukefileserva &&\
# adduser --system --uid 12232 lukefileserva &&\
# chown -R lukefileserva:lukefileserva /app 

# USER lukefileserva:lukefileserva
# RUN id
# CMD node ./dist/server/entry.mjs

# -------
## RUN apache
# FROM httpd:2.4 AS runtime
# WORKDIR .
# COPY --from=build /app/dist /usr/local/apache2/htdocs/
# EXPOSE 80


