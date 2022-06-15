import app from './config/express-app';
import env from './config/env';

app.listen(env.port, () =>
  console.log(`Server running at: http://localhost:${env.port}`)
);
