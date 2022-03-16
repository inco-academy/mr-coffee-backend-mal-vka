const express = require("express");
const dataJSON = require("./data");
// const bodyParser = require("body-parser");
const { sha256 } = require("js-sha256");
const mustacheExpress = require("mustache-express");
const tools = require("./tools")

const app = express();
const port = 3000;

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", `${__dirname}/../views`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/../static`));


// Adding form

app.get("/schedules/new", (request, response) => {
    response.render("form_newTerm", { users: tools.addId(dataJSON.users) });
});

app.get("/users/new", (request, response) => {
    response.render("form_newUser", {});
});


// Basic functionalities of displaying data

app.get("/", (request, response) => {
    response.render("welcome", {});
});

app.get("/users", (request, response) => {
    response.render("users", { users: tools.addId(dataJSON.users) });
});

app.get("/schedules", (request, response) => {
    response.render("schedules", { schedules: dataJSON.schedules });
});

app.get("/users/:url_id", (request, response) => {
    const user = dataJSON.users[request.params.url_id];
    user.id = request.params.url_id;
    response.render("user_details", user);
});

app.get("/users/:url_id/schedules", (request, response) => {
    const user = dataJSON.users[request.params.url_id];
    user.id = request.params.url_id;
    response.render("user_schedules",
        {
            user: user,
            user_schedules: dataJSON.schedules.filter(schedule => schedule.user_id === Number(request.params.url_id))
        });
});


// Adding users & terms

app.post("/schedules", (request, response) => {
    const schedule = request.body;
    const scheduleObj = {
        "user_id": schedule.user_id,
        "day": schedule.day,
        "start_at": schedule.start_at,
        "end_at": schedule.end_at
    };
    dataJSON.schedules.push(scheduleObj);
    response.redirect("/schedules");
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
    response.redirect(`/users/${dataJSON.users.length - 1}`);
});


app.listen(port, () => {
    console.log(`http://localhost:${port}/ is waiting for requests.`)
});