rebuild-dev-db: remove-db
	docker volume create mongodbdata
	docker run --name mongodb -d -p 127.0.0.1:27017:27017 -v mongodbdata:/data/db --rm mongo

remove-dev-db:
	docker stop mongodb
	docker volume rm mongodbdata

dev:
	npm run start

start-db:
	docker run --name mongodb -d -p 127.0.0.1:27017:27017 -v mongodbdata:/data/db --rm mongo

up:
	docker compose up -d

down:
	docker compose down