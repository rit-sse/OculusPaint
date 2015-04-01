Oculus Agent
====================
The Oculus Agent is a webpage that connects to the Master Agent and displays what you are drawing. 

Note: A Kinect is required for this to run.

Chrome Download
====================
https://drive.google.com/folderview?id=0BzudLt22BqGRWEtNeEQ5UW9MaG8&usp=sharing&tid=0BzudLt22BqGRbW9WTHMtOWMzNjQ#list

Linux Set-up
====================
Download Chrome from above

Getting the sandbox:

Download depot_tools from chromium repo

follow instructions to add them to your path


to build sandobx:

run fetch --nohooks --no-history chromium

build/install-build-deps.sh

gclient runhooks

ninja -C out/Debug chrome chrome-sandbox

build/update-linux-sandbox.sh


Now unzip the file downloaded from google docs

and run chrome using ./chrome

this 'should' (trademark) work
