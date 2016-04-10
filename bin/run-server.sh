#!/bin/bash
LOG_FILE="`date | tr ' ' '-'`.log"
node ../code/server.js | tee ../logs/$LOG_FILE