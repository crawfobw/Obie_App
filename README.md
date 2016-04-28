# Overview

Obie is a simple iOS chatroom application that provides Facebook authentication and allows users to send broadcast messages in four different chatrooms: Sports, Politics, Fashion, and Technology. It was built using NodeJS and React Native, and it relies primarily on TCP segments for network communication, although HTTP requests are used in several cases. The application is currently hosted locally.

# Documentation

We chose to implement the application using React Native, a framework for building native apps using JavaScript and Facebook's React library. We decided to use React Native because it is a cutting edge technology that is gaining significant traction in the marketplace and is an effective tool for creating user interfaces as a JavaScript developer. Instead of manipulating DOM elements within HTML pages, everything in React Native happens inside of components, which have various lifecycle stages and a render function to manipulate the DOM. Each component has a props object, which holds static information for a page, and a state object, which holds dynamic information for that page. For more information about React Native, please visit https://facebook.github.io/react-native/.

All server code can be found in the index.js file in the Server directory.

All client code can be found in the Client/Obie/App/Components directory in the following files:
- Home.js
- Login.js
- EnterName.js
- ChatRoom.js

### index.ios.js
All navigation within the app occurs in the index.ios.js file in the Client/Obie directory. Every React Native application has one of these files, and it is the first thing that runs when a client opens the app. This component manages the app's routing in the renderScene function by setting the navigator object, which is basically a stack that keeps track of where the client is in the app. This feature is key for navigating through the app and going back.

### Login.js & EnterName.js
All of the login and authentication logic occurs in the Login.js file, which uses the react-native-facebook-login library to provide Facebook user authentication. When the user attempts to log in, we set the state object with the user's credentials and emit a message via TCP to the server, which then saves the user's credentials. The navigator then redirects to the EnterName component, which has a listener on the text box for when the user enters a name, as well as a listener on the submit button. When this button is pressed, the navigator pushes the Home component onto the navigation stack with the user's credentials, including user ID, permissions, and a public access token, which is used to query the Facebook API.

### Home.js
Once the user makes it to the home screen, the Home component in Home.js initiates an HTTP GET request to Facebook to obtain the user's information and sets the user's name to a state object. The rest of this component consists of a set of buttons with listeners to access the four different chatrooms. The corresponding handler for each listener calls the goToChatRoom function, passing the chatroom, the user's name, and the navigator object. The goToChatRoom function then pushes the ChatRoom component onto the navigation stack with the room ID and the user's name.

### ChatRoom.js
Each chatroom is managed by the ChatRoom component. After it is finished loading, the component calls the componentDidMount function, which we have overridden to get room information and update messages in the chatroom. It initially emits a TCP message to get the room information, which the server's 'get room' listener catches. The server then looks up the room and emits a TCP message back to the client, whose 'room info for' listener accepts and sets the component's state with the room name and any existing messages. The ChatRoom also has a listener for the user typing a message, and if the user then clicks the message submit button, the handleMessageSubmit handler emits a TCP message to the server with the user's name, the content of the message, and the room ID. The server's 'chat message' listener accepts this message, pushes the message content onto the room's messages array, and emits a message back to the client. The client's 'message from' listener then accepts this message and updates its state object by adding the new message for all of the users in the room to see. The final aspect of the ChatRoom component is the handleBack handler, which responds to the user clicking the back button and pops the page off the navigation stack.

It is important to note that there is currently no database connected to the server, which means that messages will persist in the chatrooms as long as the server remains on. If the server is shut down, then all of the messages will disappear.

# Challenges

1. **Learning curve for React Native**: Our team was fairly new to the React Native framework, which significantly slowed down our development time initially. Because it is a new framework (on v0.24), the documentation and community support was definitely lacking as well, which led to difficulties when attempting to debug. For example, one problem that we encountered was only addressed two days before we began development. This problem was ultimately solved by watching videos online and looking at example projects.
2. **Installing and configuring SDKs for iOS**: Anyone who has developed apps for iOS knows that the start up time involved with installing and configuring all the SDKs and dependencies needed is one of the biggest hurdles. The solution to this ultimately came down to a lot of Googling and trial-and-error.
3. **The intricacies of JavaScript**: Several aspects of JavaScript are very difficult to wrap your mind around if you have not done significant amounts of programming in the language. The asynchronous nature of the language and all of the callbacks took some getting used to, but ultimately this was solved with practice.

# Future Work

In the future, we would like to add the ability to dynamically add and delete chatrooms. We would also like to add a database connection to manage user information and chatroom messages. Although these were not pivotal features to implement in the first version of our application, they would definitely add to the usability and reliability of the app if we were to implement them in the future.

# Installation

To start, please 'npm install' in both the Client/Obie and Server directories.

To run the server, run 'node index.js' in the Server directory.

Currently, only iOS is supported. To run the app in the iOS simulator, please open the Client/ios folder in XCode and run.
