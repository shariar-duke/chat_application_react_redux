const cors = require('cors');
const auth = require("json-server-auth");
const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 9000;

// Bind the router db to the app
server.db = router.db;

server.use(middlewares);

// Use CORS middleware
server.use(cors());

// Authentication rules
const rules = auth.rewriter({
    users: 640,
    conversations: 660,
    messages: 660,
});

server.use(rules);
server.use(auth);
server.use(router);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
