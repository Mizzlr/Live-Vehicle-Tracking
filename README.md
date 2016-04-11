Live Vehicle Tracking:
----------------------

step 1: ssh to AWS 

```
$ # open command prompt *cmd*
$ ssh -i /path/to/shueb786.pem ec2-user@ec2-54-169-247-148.ap-southeast-1.compute.amazonaws.com
$ cd lvt/bin
$ ls
$ # you should see the .sh scripts
```

step 2: start the server

```
$ ./start-server.sh
$ # to attach to the server run 
$ ./attach-server.sh
$ # to detach from the server press Ctrl+A d
$ # you can also kill the server with Ctrl+C
```

step 3: stop the server
```
$ ./stop-server.sh
$ # to see the logged data
$ cd ../logs
$ ls
$ # now cat the file you see and pipe it to less
$ cat example.log | less
$ # replace example with your file name
```

