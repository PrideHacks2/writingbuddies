## Attributions
Images from Canva and Unsplash!


## Node and sockets notes
* ok so how it works is first the client ping the server
* the server adds the client to the room
* the client then can send msgs to the room thats it

* so the client can only do emit events
* and they can listen on other events
* the stuff they listen can have like extra parameters depending on the event so thats how data is passed

* for my example server side
    * use `node index.js` to start the example
* for my example client side
    * use the get id to see the id
    * then click joinRoom1 to join room1
    * then click sendRoom1 to broadcast msg to room one


* follow [this](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment) tut to create new node project
* follow [this](https://socket.io/get-started/chat) to get started with sockets in node.js
