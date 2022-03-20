const addId = (arr) => {
    arr.forEach((obj, index) => {
        obj["added_id"] = index;
    });
    return arr;
};

const addUserName = (arr, users) => {
    arr.forEach(obj => {
        console.log(users[obj.user_id]);
        obj.firstname = users[obj.user_id].firstname;
        obj.lastname = users[obj.user_id].lastname;
    });
    return arr;
};

const datetimeFormatter = (arr) => {
    arr.forEach(obj => {
        obj.weekday = obj.date.toLocaleString('pl-PL', {
            weekday: "long"
        });
        obj.start_at = obj.start_at.slice(0, 5);
        obj.end_at = obj.end_at.slice(0, 5);
    });
    return arr;
};

const filterByUserId = (arr, url_id) => {
    return arr.filter(item => item.user_id === url_id);
};

module.exports = {
    addId: addId,
    datetimeFormatter: datetimeFormatter,
    filterByUserId: filterByUserId,
    addUserName: addUserName
};
