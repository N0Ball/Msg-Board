rebuild-db: remove-db
	docker volume create mongodbdata
	docker run --name mongodb -d -p 27017:27017 -v mongodbdata:/data/db --rm mongo

remove-db:
	docker volume rm mongodbdata