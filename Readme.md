[White-Board-Website](https://whiteboardtest.firebaseapp.com)
================================

![Website's home page](https://i.gyazo.com/eb5a78c522cb5a9012679ba53ac2269b.png)

Functionnality
-----------

* Add, update and delete boards
* Authentification via Google oauth with Hosted Domain control made by a custom [proxy](https://github.com/CremAlex/proxy-whiteboard)
* Real-time presence counter displayed for each boards


Build the app
=============

### How to start:

1. Install the requirements see below
2. Clone this project : `git clone https://github.com/thomaswinckell/reactfire-white-board-website.git`
3. Install all Npm dependencies: `cd reactfire-white-board-website && npm install`
4. Configure the project (enter your authentication proxy address, firebaseUrl, googleClientKey, googleMapApiKey ...) into package.json
    4.1. Generate google keys on `https://console.developers.google.com/iam-admin/projects`
5. Start dev server: `npm start`
6. Build the project : `npm run build`
7. To deploy on Firebase: `firebase deploy` make sure to have firebase cli installed and init a firebase project


Requirements
------------

Install NodeJS and npm
Install Firebase-cli (If you want to deploy on Firebase)

Configuration
------------
See the config object in the package.json

Dependencies Installation
------------
npm install

Dev
------------
npm run start
