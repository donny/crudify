curl -i -X GET http://0.0.0.0:8080/forums/testname2
curl -i -X POST http://0.0.0.0:8080/post -d '{"name":"post3"}'
curl -i -X GET http://0.0.0.0:8080/post
