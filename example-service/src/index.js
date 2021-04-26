const app = require('express')();
const { v4: uuid } = require('uuid');
const axios = require('axios');

const port = process.env.PORT || 3000;
const nextServiceHost = process.env.NEXT_SERVICE_HOST;
const nextServicePort = process.env.NEXT_SERVICE_PORT;

app.get('/entrypoint', async (req,res) => {
  const traceId = req.headers['TRACE_ID'] || uuid();
  if (!nextServiceHost || !nextServicePort) {
    res.json({
      message: "no service called"
    });
    return;
  }

  //TODO call next service
  const absoluteUrl = `http://${nextServiceHost}:${nextServicePort}/`;
  const response = await axios({
    method: 'get',
    url: absoluteUrl,
    headers: {
      TRACE_ID: traceId
    }
  });
  res.json({
    nextServiceUrl: `http://${nextServiceHost}:${nextServicePort}/`,
    responseStatus: response.status
  });
});

app.listen(port);