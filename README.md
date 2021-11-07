
Step 1: Download or clone the code from this repo https://github.com/mohamedasaf/flightbookingapp

Step 2: Create .babelrc file in root folder and place the below code

{ "presets": [ "env", "react" ], "plugins": [ "syntax-dynamic-import", "transform-object-assign", "transform-class-properties", "transform-object-rest-spread" ], "env" : { "test": { "plugins": ["dynamic-import-node"] } } }

Step 3: Create .eslintrc file in root folder and place the below code

{ "parser": "babel-eslint", "parserOptions": { "sourceType": "module", "allowImportExportEverywhere": true } }

Step 4: npm install

Step 5: Open terminal and give "npm run api" to run the mock api sever

Step 6: Open the new terminal and give "npm run start" to run the application

Step 7: Open the browser and hit this URL http://localhost:9090/ once build is completed

Please follow the below test cases

Note: I have mocked up the json just little, please test accordingly 

Test Case 1:
Soruce City - Chennai Internation Airport, Chennai
Destniation City - Heathrow, London
Depature Date - 17/11/2021

Test Case 2:
Source City - Chennai Internation Airport, Chennai
Destination City - Heathrow, London
Depature Date - 17/11/2021
Arrival Date - 25/11/2021

Test Case 3:
Source City - Chennai Internation Airport, Chennai
Destination City - Heathrow, London
Depature Date - 21/11/2021
Arrival Date - 25/11/2021

Test Case 4:
Soruce City - Chennai International Airport, Chennai
Destination City - Beijing
Depature Date - 17/11/2021
