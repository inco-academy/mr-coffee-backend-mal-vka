// step 1

const express = require("express");
const dataJSON = require("./data");

const app = express();
const port = 3000;

const bodyParser = require("body-parser");
const { sha256 } = require("js-sha256");
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`http://localhost:${port}/ is waiting for requests.`)
});


// step 2

app.get("/", (request, response) => {
    response.send("Welcome to our schedule website");
});

app.get("/users", (request, response) => {
    response.json(dataJSON.users);
});

app.get("/schedules", (request, response) => {
    response.send(dataJSON.schedules);
});


// step 3

app.get("/users/:user_id", (request, response) => {
    response.json(dataJSON.users[request.params.user_id]);
});

app.get("/users/:user_id/schedules", (request, response) => {
    response.json(dataJSON.schedules.filter(item => item.user_id === Number(request.params.user_id)));
});


// step 4

app.post("/schedules", (request, response) => {
    const schedule = request.body;
    const scheduleObj = {
        "user_id": schedule.user_id,
        "day": schedule.day,
        "start_at": schedule.start_at,
        "end_at": schedule.end_at
    };
    dataJSON.schedules.push(scheduleObj);
    response.json(scheduleObj);
});

app.post("/users", (request, response) => {
    const user = request.body;
    const userObj = {
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "password": sha256(user.password)
    };
    dataJSON.users.push(userObj);
    response.json(userObj);
});