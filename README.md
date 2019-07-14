# ClickMeeting Recruitment App

Project was to develop small web application according to provided instructions. It should count circiut and field of three figures (cirlce, square and rectangle), it should be developed to give ability to add new figures and caluculation types. 

As it was mentioned in requirements I have used the newest Angular framework to build front part of application. I have used some additional libraries and components to style page (bootstrap) and to automate parsing and evaluating math expressions.

In this project I wasn't provided with any images or logos so I created sample ones.

Application also provide small production server (node.js + express) with rest api to work as a standalone application. Node server is used to display files when deployed on Heroku. Api methods provide functionality to save new figures or add new type of calculation to existing figures. Database is simualated by json file.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli), Angular version 8.0.1, using node 10.13.0 and npm 6.4.1.

## First step

To run application in production on your local machine, firstly download or clone the repo, then You need to install all dependencies. Please go to Command Line or Terminal and go to folder with application. In root directory of application please run `npm install`. It will install all necessary dependencies and build project to provide dist folder. After successfull installation You can proceed with starting server. 

## Production server

Run `npm start` for a production server. Navigate to address that is shown in console window. If you run it on Your local machine it will probably be http://localhost:3000/. 
I also deployed this app on Heroku so You can use this link https://clickmeeting-rec-app.herokuapp.com/ to see application is working on server. Please have in mind that on Heroku after page is not used for a while it goes to sleep mode. When You will proceed with link it can have some delay to show the page - usually few secends.

## App instruction

When You open page in browser, you will see first page with dropdown list - this is calculation view. To change views You can click beetween menu options. Calculation view is used to choose figures, calculation type, gather information about variables and evaluate expression. First choose figure from dropdown list and you will see specific caluculation for seleceted fidure. I decide to seperate this because figures can have their own specific calculation type. When you choose the calculation type then another section is shown. In this section there is input with expression, so You can check if it is correct. Application is looking for varibales in expression and is providing inputs for each variable. When in expression is "PI" variable system is getting its value automaticaly. When You provide values for all variables You can click calculate and app will show result of expression.

Second option in menu is used to add new figure with calculation type or add caculation type to existing figure. First You provide name in dropdown list -  You pick one from list or type new - to accept your input pleas click LPM or ENTER. In next input provide name of this calculation for example circiut or field and next expression that will be parsed and evaluated when used caluculation view. When you can procced click SUBMIT and data will be send to server and database will update. After app prompt that everything went well you can use your new data in calculation view or you can add new data.

## GIT and Heroku repository for this application

Heroku: https://clickmeeting-rec-app.herokuapp.com/
GIT: https://github.com/lmar13/clickmeeting-rec-app

### Error

Sometimes You can see error in console `Node / Express: EADDRINUSE, Address already in use`. That's mean that the port I provided can be occupied already. To deal with that error go to root folder and find `server.js` file. There go to line 91 and change number `3000` to another one for example `3001`. Save file and proceed to step run `Production server`.
