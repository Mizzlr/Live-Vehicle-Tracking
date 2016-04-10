#!/bin/bash
SCREEN_PID="`ps -ef | grep node | head -n 1 | cut -d " " -f 2 | tr -d "\n"`"
kill -9 $SCREEN_PID
