FROM node:lts-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Install deps
FROM base AS prod-deps
RUN npm install --omit=dev
FROM base AS build-deps
RUN npm install 

# Build 
FROM build-deps AS build
COPY . .
ENV NODE_OPTIONS=--max_old_space_size=4096 
RUN npm run build


#  Run app
# FROM base AS runtime
FROM httpd:2.4 AS runtime
WORKDIR .
# COPY --from=prod-deps /app/node_modules ./node_modules
# COPY --from=build /app/dist ./dist
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# RUN addgroup --system --gid 12232 lukefileserva &&\
# adduser --system --uid 12232 lukefileserva &&\
# chown -R lukefileserva:lukefileserva /app 

# USER lukefileserva:lukefileserva
# RUN id

# CMD node ./dist/server/entry.mjs
# CMD tail -f /dev/null
EXPOSE 8091
