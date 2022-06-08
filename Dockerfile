FROM node:16-alpine AS deps
WORKDIR /app
COPY . .
RUN npm install --only=production --ignore-scripts

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S demo -u 1001

COPY --from=deps /app/src ./src
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json

USER demo

EXPOSE 3000

CMD ["npm", "start"]