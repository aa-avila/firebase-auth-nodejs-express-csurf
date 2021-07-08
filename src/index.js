const app = require('./app');

// INICIAR SERVIDOR
const PORT = app.get('port');

app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });