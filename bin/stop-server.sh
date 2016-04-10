#!/bin/bash
SCREEN_PID="`ps -ef | grep node | head -n 1 | cut -d " " -f 2 | tr -d "\n"`"
echo "SCREEN_PID is $SCREEN_PID"
kill -9 $SCREEN_PID
