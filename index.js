const express = require('express')
var cors = require('cors-express');
const ps = require('aws-param-store');
const parser = require("body-parser");

const app = express()

app.use(parser.json());

// const options = {
//     allow: {
//         origin: ["*"],//'https://lazy-erin-turkey-sari.cyclic.cloud/',
//         methods: 'GET,PATCH,PUT,POST,DELETE,HEAD,OPTIONS',
//         headers: 'Content-Type, Authorization, Content-Length, X-Requested-With, X-HTTP-Method-Override'
//     }
// }

app.use(cors());



app.all('/', (req, res) => {
    res.send({ status: 'Yo! with some chenges', changes: "done" })
})

app.get("/params/:project/:stage", async (req, res) => {

    const { aws_access_key_id: AWS_ACCESS_KEY_ID, aws_secret_access_key: AWS_SECRET_ACCESS_KEY, aws_session_token: AWS_SESSION_TOKEN, region: REGION } = req.headers;
    const { project, stage } = req.params;

    const parameters = await ps.getParametersByPath(`/${project}/${stage}`, { region: REGION ?? 'eu-west-1', accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, sessionToken: AWS_SESSION_TOKEN })

    res.send({ status: "success", data: parameters });

});


app.put("/params/:project/:stage", async(req, res) => {

    const { aws_access_key_id: AWS_ACCESS_KEY_ID, aws_secret_access_key: AWS_SECRET_ACCESS_KEY, aws_session_token: AWS_SESSION_TOKEN, region: REGION } = req.headers;
    const { project, stage } = req.params;
    const {key, value, type} = req.body;

    await ps.putParameter(key, value, type, {region: REGION ?? 'us-east-1', Overwrite: true, accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_ACCESS_KEY, sessionToken: AWS_SESSION_TOKEN })

    res.send({status: "success"});

});

app.listen(process.env.PORT || 3000)
