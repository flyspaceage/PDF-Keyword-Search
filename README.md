# Abstract
Often times, we have tons of files of different types (e.g. .pdf, .doc, .docx, .ppt, .png, .html, ,jpg etc.) stored in an unstructured/haphazard manner on a laptop. Suppose, in our particular case, these files essentially contain text (scientific papers, research proposals, legal documents and what not).

We want to organize these files in a nice directory structure as per the keywords the user provides. So, we want one directory for files matching a particular keyword and a file should appear in all the directories corresponding to the keywords it matches. 

In order to determine the keywords a file matches, we want to read the text in this file and look for the occurrence of various keywords in the text .

Write an application using Node/Express and React/Redux for this purpose.

# Built With

- [React](https://reactjs.org/) - Frontend javascript library
- [Node](https://nodejs.org/en/) - Backend framework
- [Express](https://expressjs.com/) - Node.js web application framework

# Acknowledgments

- **David Bashford** [textract](https://www.npmjs.com/package/textract)

- **Antonio Erdeljac** [tutorial](https://medium.com/@_aerdeljac/file-upload-with-node-js-react-js-686e342ad7e7)

- **Tim Smith** [tutorial](https://dev.to/iam_timsmith/lets-build-a-search-bar-in-react-120j)

# Available Scripts

This project was bootstrapped with:
[Create React App](https://github.com/facebook/create-react-app),
[Express Generator](https://www.npmjs.com/package/express-generator).

Using node 8.10 run the following commands to test the project:

In the root directory run:

## `npm install`

## `npm start`

Runs the app in the development mode.<br>
Open <http://localhost:3000> to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

Once the app is started open a new Terminal window.<br>
From the app root cd into the API directory.<br>
Start the Express server:<br>

## `cd api`

## `nodemon app.js`

Nodemon will watch for updates.
