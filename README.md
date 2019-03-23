# quick-auth
Quick implementation of react-router authentication

I wanted to learn more about sessions and authentication
and how the system might work without too many frameworks/libraries,
so here's my app that implements auth and sessions from scratch.

I also set out to work with react-router to gain more experience with it,
and using it with auth/sessions taught me a lot!

Basically, I initialized two JS objects, one a fake database, one a fake session
store. Then I parse the clients cookie, or give them one if they don't have it.
From there, since I'm using react-router, I don't need to validate or check the validity of the session more than once, since the browser only sends my server a GET
request once. React-router takes care of the rest on the client side without interacting with my server.

That is until the client needs to either signup or login, at which point the client sends POSTs to either of those respective endpoints and then is authenticated and given a new session, or is created in my db and given a new session.

To install -->
Clone repo and enter root directory. (node v11.8.0)

$ npm install

open two terminals (my scripts use nodemon and --watch so they're running continuosly)
in one terminal

$ npm run server-dev

in the other

$ npm run react-dev

in the browser, go to http://localhost:3000




