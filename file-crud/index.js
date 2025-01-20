const http = require('http');
const fs = require('fs');
const path = require('path');

// File path for users.json
const usersFilePath = path.join(__dirname, 'users.json');

// Read Users from file
const readUsers = () => {
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  return JSON.parse(data);
};

//  write users to file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// Create server
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Get all users
  if (method === 'GET' && url === '/users') {
    const users = readUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  }

  // Get user by ID
  else if (method === 'GET' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    const users = readUsers();
    const user = users.find((u) => u.id === id);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  // Add a new user
  else if (method === 'POST' && url === '/users') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const newUser = JSON.parse(body);
      const users = readUsers();

      newUser.id = Date.now().toString(); // Generate a unique ID
      users.push(newUser);

      writeUsers(users);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  }

  // Update a user 
  else if (method === 'PUT' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const updatedData = JSON.parse(body);
      const users = readUsers();
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        writeUsers(users);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users[userIndex]));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    });
  }

  // Delete a user 
  else if (method === 'DELETE' && url.startsWith('/users/')) {
    const id = url.split('/')[2];
    const users = readUsers();
    const filteredUsers = users.filter((u) => u.id !== id);

    if (filteredUsers.length !== users.length) {
      writeUsers(filteredUsers);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User deleted successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  }

  //  invalid routes
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});