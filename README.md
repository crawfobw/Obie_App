# Overview

Obie is a simple iOS chatroom application that provides Facebook authentication and allows users to send broadcast messages in four different chatrooms: Sports, Politics, Fashion, and Technology. It was built using NodeJS and React Native, and it relies primarily on TCP segments for network communication, although HTTP requests are used in several cases. The application is currently hosted locally.

# Documentation

We chose to implement the application using React Native, a framework for building native apps using JavaScript and Facebook's React library. We decided to use React Native because it is a cutting edge technology that is gaining significant traction in the marketplace and is an effective tool for creating user interfaces as a JavaScript developer. Instead of manipulating DOM elements within HTML pages, everything in React Native happens inside of components, which have various lifecycle stages and a render function to manipulate the DOM.

## Server

All server code can be found in the index.js file in the Server directory.



## Client

All client code can be found in the Client/Obie/App/Components directory in the following files:
- Home.js
- Login.js
- EnterName.js
- ChatRoom.js

# Challenges

# Future Work

# Installation

To start, please 'npm install' in both the Client/Obie and Server directories.

To run the server, run 'node index.js' in the Server directory.

Currently, only iOS is supported. To run the app in the iOS simulator, please open the Client/ios folder in XCode and run.
