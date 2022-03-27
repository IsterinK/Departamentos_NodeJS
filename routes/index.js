const express = require('express');
const deparmentsRouter = require('./departments.router')

function routerApi(my_app){
  const router = express.Router();
  /* Endpoint estático: http//localhost:4000/api/v1 */
  my_app.use('/api/v1', router);
  /* Endpoint estático: http//localhost:4000/api/v1/departments */
  router.use('/departments', deparmentsRouter);
}

module.exports = routerApi