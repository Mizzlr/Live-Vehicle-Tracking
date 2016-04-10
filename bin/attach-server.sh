#!/bin/bash

SCREEN_ID="`screen -ls | head -n 2 | tail -n 1 | \
cut -d "." -f 1 | tr -d  "\t" | tr -d "\n"`"

screen -r $SCREEN_ID
