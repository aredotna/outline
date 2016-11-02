import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import forceSSL from 'express-force-ssl';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import schema from './schema';
import loaders from './lib/loaders';
import config from './config';
import { info, error } from './lib/loggers';
import auth from './lib/auth';
import graphqlErrorHandler from './lib/graphql_error_handler';

const {
  PORT,
  NODE_ENV,
  ARENA_API_URL,
} = process.env;

const app = express();
const port = PORT || 3000;

if (NODE_ENV === 'production') {
  app.set('forceSSLOptions', { trustXFPHeader: true }).use(forceSSL);
}

app.get('/favicon.ico', (req, res) => {
  res
    .status(200)
    .set({ 'Content-Type': 'image/x-icon' })
    .end();
});

app.all('/graphql', (req, res) => res.redirect('/'));

app.use(bodyParser.json());
app.use('/', auth, cors(), morgan('combined'), graphqlHTTP(request => {
  info('----------');

  loaders.clearAll();

  const accessToken = request.headers['x-access-token'];

  return {
    schema,
    graphiql: true,
    rootValue: {
      accessToken,
    },
    formatError: graphqlErrorHandler(request.body),
  };
}));

app.listen(port, () => info(`Listening on ${port}`));
