# Webpage downloader & Data Uploader to ThingSpeak

## Overview
Can be use if a web server does not have API interface and you need to extract information from it and save them to a database.
This program is designed to download a web page, extract useful data, and upload them to a ThingSpeak database using POST request.
Program is devided into three parts: 
    1. Downloader - it downloads web page
    2. Data repository - it contains adapter which prepare data in appropriate format and data storage manager which upload them to ThingSpeak database
    3. Data flow controller - it manages data flow from downloader to data storage manager
Code in main file checks if environmental variables exist, creates new data flow controller and run whole process (download and upload data) every 15s 

## Installation
1. Clone this repository: git clone https://github.com/koutnyt/Steam_measuring.git
2. Navigate to the project directory
3. Install the required dependencies: npm install
4. Create .env file and insert variables
    STEAM_WEBSERVER = ...
    DATABASE = ...
    WRITE_API_KEY = ...
5. Run typescript compiler: npx tsc

## Usage
2. Navigate to dist/src/
3. Run the `main.js` script: node main.js
