const app = require('./config/server.config');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
require('./socket/index.js')(io);

app.use('/api', require('./routes/api.routes.js'));
app.use('*', require('./routes/html.routes.js'));
// !!! app.use(require('./api/error.js'));
app.set('port', (process.env.PORT || 3000));
app.set('host', (process.env.IP || 'localhost'));
server.listen(app.get('port'), app.get('host'), () => {
  console.log(`Server running on http://${app.get('host')}:${app.get('port')}`);
});
