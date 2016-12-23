docker build -t ailicai-im:latest .
docker ps -a -q -f name=ailicai | xargs -I {} docker stop {}
docker ps -a -q -f name=ailicai | xargs -I {} docker rm {}
docker run -d -p 3000:3000 --name ailicai ailicai-im:latest