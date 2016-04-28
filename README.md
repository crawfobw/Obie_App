# Overview

Obie is a simple iOS chatroom application that provides Facebook authentication and allows users to send broadcast messages in four different chatrooms: Sports, Politics, Fashion, and Technology. It was built using NodeJS and React Native, and it relies primarily on TCP segments for network communication, although HTTP requests are used in several cases. The application is currently hosted locally.

# Documentation

We chose to implement the application using React Native, a framework for building native apps using JavaScript and Facebook's React library. We decided to use React Native because it is a cutting edge technology that is gaining significant traction in the marketplace and is an effective tool for creating user interfaces as a JavaScript developer. Instead of manipulating DOM elements within HTML pages, everything in React Native happens inside of components, which have various lifecycle stages and a render function to manipulate the DOM. For more information about React Native, please visit https://facebook.github.io/react-native/.

All server code can be found in the index.js file in the Server directory.

All client code can be found in the Client/Obie/App/Components directory in the following files:
- Home.js
- Login.js
- EnterName.js
- ChatRoom.js

All navigation within the app occurs in the index.ios.js file. Every React Native application has one of these files, and it is the first thing that runs when a client opens the app. This component manages the app's routing in the renderScene function by setting the navigator object, which is basically a stack that keeps track of the order of pages visited.

All of the login and authentication logic occurs in the Login.js file, which uses the react-native-facebook-login library to provide Facebook user authentication. When the user attempts to log in, we set the state object with the user's credentials and emit a message via TCP to the server, which then saves the user's credentials. The navigator then redirects to the EnterName component, which has a listener on the text box for when the user enters a name, as well as a listener on the submit button. When this button is pressed, the navigator pushes the Home component onto the navigation stack and sets the user's name in a state object.



# Challenges

# Future Work

# Installation

To start, please 'npm install' in both the Client/Obie and Server directories.

To run the server, run 'node index.js' in the Server directory.

Currently, only iOS is supported. To run the app in the iOS simulator, please open the Client/ios folder in XCode and run.
