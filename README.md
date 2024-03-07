# Webpage downloader & Data Uploader to ThingSpeak service

## Overview
Can be use if a web server does not have API interface and you need to extract information from web page and store them.
This program is designed to download a web page, extract useful data, and upload them to a ThingSpeak service using POST request.

Program is devided into four parts: 
1. Web page downloading - it downloads web page and returns it as JSDOM object
2. Data parser - it parses data from JSDOM to JSON format
3. Data uploading - it send POST request with data in body to ThingSpeak service
4. Code in index file checks if environmental variables exist and run process of downloading and uploading data to ThingSpeak service every 15s 

## Installation
1. Clone this repository: git clone https://github.com/koutnyt/Steam_measuring.git
2. Navigate to the project directory
3. Install the required dependencies: npm install
4. Create .env file and insert variables
    * STEAM_WEBSERVER = ...
    * WRITE_API_KEY = ...
    * DATABASE = ...
5. Run typescript compiler: npx tsc

## Usage
1. Navigate to dist/src/
2. Run script in `index.js` file: node index.js
