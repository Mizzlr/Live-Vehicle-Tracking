#!/bin/bash
SCREEN_PID="`ps -ef | grep SCREEN | head -n 1 \
	| cut -d " " -f 3 | tr -d "\n"`"

echo "Killing screen with SCREEN_PID $SCREEN_PID"
kill -9 $SCREEN_PID
