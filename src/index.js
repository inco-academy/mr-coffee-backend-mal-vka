const express = require("express");
const dataJSON = require("./data");
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

const { Pool } = require("pg");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mr.coffee",
    password: "123",
    port: 5432,
});


// Adding form

app.get("/schedule/new", (request, response) => {
    response.render("form_newTerm", { users: tools.addId(dataJSON.users) });
});

app.get("/users/new", (request, response) => {
    response.render("form_newUser");
});


// Basic functionalities of displaying data

app.get("/", (request, response) => {
    response.render("welcome");
});

app.get("/users", (request, response) => {
    response.render("users", { users: tools.addId(dataJSON.users) });
});

// 3b:
// app.get("/schedules", (request, response) => {
//     response.render("schedules", { schedules: dataJSON.schedules });
// });
// 3c:
app.get("/schedule", async (req, res, next) => {
    let schedule = await pool.query("SELECT * FROM schedule ORDER BY date, start_at;");
    schedule = tools.addUserName(schedule.rows, dataJSON.users);
    schedule = tools.datetimeFormatter(schedule);
    res.render("schedules", { schedules: schedule });
});

app.get("/users/:url_id", (request, response) => {
    const user = dataJSON.users[request.params.url_id];
    user.id = request.params.url_id;
    response.render("user_details", user);
});

//3b:
// app.get("/users/:url_id/schedules", (request, response) => {
//     const user = dataJSON.users[request.params.url_id];
//     user.id = request.params.url_id;
//     response.render("user_schedules",
//         {
//             user: user,
//             user_schedules: tools.filterByUserId(dataJSON.schedules, Number(request.params.url_id))
//         });
// });
//3c:
app.get("/users/:url_id/schedule", async (request, response) => {
    const user = dataJSON.users[request.params.url_id];
    user.id = request.params.url_id;
    const schedules = await pool.query(`SELECT * FROM schedule WHERE user_id = ${user.id} ORDER BY date, start_at;`);

    response.render("user_schedules",
        {
            user: user,
            user_schedules: tools.datetimeFormatter(schedules.rows)
        });
});

// Adding users & terms

//3b:
// app.post("/schedules", (request, response) => {
//     const schedule = request.body;
//     const scheduleObj = {
//         "user_id": schedule.user_id,
//         "day": schedule.day,
//         "start_at": schedule.start_at,
//         "end_at": schedule.end_at
//     };
//     dataJSON.schedules.push(scheduleObj);
//     response.redirect("/schedules");
// });
//3c:
app.post("/schedule", async (request, response) => {
    const { user_id, date, start_at, end_at } = request.body;
    await pool.query(`INSERT INTO schedule
        (user_id, date, start_at, end_at)
    VALUES
        ('${user_id}', '${date}', '${start_at}', '${end_at}' 
    );`);
    response.redirect("/schedule");
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
