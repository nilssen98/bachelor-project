#!/bin/ash
# Environment variables are not passed to the container when it is started
# Need to explicitly pass the DATABASE_URL var here, otherwise prisma won't work

# Run migrations
DATABASE_URL="postgres://root:root@database:5432/root" npx prisma db push
# Start the app
DATABASE_URL="postgres://root:root@database:5432/root" node server.js
