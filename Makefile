# Install the dev environment
build-dev: rebuild-dev-db
	npm install

# Rebuild the dev mongodb
rebuild-dev-db: remove-dev-db
	docker volume create dev-mongodbdata
	docker run --name mongodb -d -p 127.0.0.1:27017:27017 -v mongodbdata:/data/db --rm mongo
	echo ---------------------------------------
	echo mongodb had started on port 27017
	echo ---------------------------------------

# Remove dev mongodb
remove-dev-db:
	docker rm -f mongodb
	docker volume rm -f dev-mongodbdata

# Start dev server
up-dev:
	npm run start

# Build the environment
build: down
	docker volume create mongodbdata
	docker build . -t msg-board-api --no-cache

# Start prod service
up:
	docker compose up -d

# Terminate prod service
down:
	docker compose down

restart:
	docker compose restart

# Refresh prod db (This will remove all the stored data)
refresh-db:
	docker volume rm -f mongodbdata
	docker volume create mongodbdata

# Clean the environment
clean: down remove-dev-db
	docker volume rm -f mongodbdata
	docker rmi -f msg-board-api