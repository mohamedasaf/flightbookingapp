
Step 1: Download or clone the code from this repo https://github.com/mohamedasaf/flightbookingapp

Step 2: Create .babelrc file in root folder and place the below code

{ "presets": [ "env", "react" ], "plugins": [ "syntax-dynamic-import", "transform-object-assign", "transform-class-properties", "transform-object-rest-spread" ], "env" : { "test": { "plugins": ["dynamic-import-node"] } } }

Step 3: Create .eslintrc file in root folder and place the below code

{ "parser": "babel-eslint", "parserOptions": { "sourceType": "module", "allowImportExportEverywhere": true } }

Step 4: npm install

Step 5: Open terminal and give npm run api to run the mock api sever

Step 6: Open new terminal and give npm run start to run the application

Step 7: Open the browser and hit this URL http://localhost:9090/ once build is completed
