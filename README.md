# Tic-Tac-Toe-Game
This game is written using Javascript, HTML and CSS. SSL(Secure Sockets Layer) is also included.
## Server-Side (Node.js)
Dependencies: Requires express, fs, path, https, and socket.io. 
<br> 
HTTPS Server: Creates an HTTPS server using the provided SSL certificate and private key.
<br>
Socket.IO Initialization: Sets up Socket.IO on the server.
<br>
Static File Serving: Serves static files from the root directory.
### Socket.IO Events:
"find": Handles when a player tries to find a match.
<br>
"playing": Handles when a player makes a move.
<br>
"gameOver": Handles when a player exits the game.
<br>
HTTP Route: Defines a route for the root URL, serving an HTML file.
## Client-Side (HTML/JavaScript)
HTML Structure: Contains a form with an input field for the player's name and a button to find a match.
### JavaScript:
Sends a "find" event to the server with the player's name when the button is clicked.
<br>
Listens for "playing" events from the server to update the game state.
