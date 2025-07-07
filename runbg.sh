#!/bin/bash
# Check another 'node server.js' running
pid=$(ps aux | grep -i 'node server.js' | grep -v -i "grep" | awk '{print $2}')
echo $pid
if [ ! -e $pid ]; then
  read -p "Another 'node server.js' found, kill it first then run this one (y/n)? " sel

  # If y not pressed then end
  if [ ! "${sel,,}" == "y" ]; then
    echo Aborted.
    exit 1
  fi

  # If y pressed then kill previous node server.js
  kill $pid
  echo "Another 'node server.js' process killed."
fi

# Run node server.js under Linux background
node server.js &

# Start the server under Linux Shell and run in background
nohup node server.js &
if [ -e nohup.out ]; then
  cat nohup.out
else
  echo "Type 'cat nohup.out' to view node server.js output."
fi
