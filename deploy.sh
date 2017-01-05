docker build -t rudy-im:latest .
docker ps -a -q -f name=rudy | xargs -I {} docker stop {}
docker ps -a -q -f name=rudy | xargs -I {} docker rm {}
docker run -d -p 3000:3000 --name rudy rudy-im:latest