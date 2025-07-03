###IMAGE

STOP
docker stop $(docker ps -q)

Create Image 
docker build --no-cache -t my-express-app .

Run Image
docker run -p 3000:3000 my-express-app


###COMPOSE

RUN
docker-compose up --build --remove-orphans

DOWN/STOP
docker-compose down