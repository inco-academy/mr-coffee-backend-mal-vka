const addId = (arr) => {
    arr.forEach((obj, index) => {
        obj["added_id"] = index;
    });
    return arr;
};

const datetimeFormatter = (arr) => {
    arr.forEach((obj) => {
        obj.weekday = obj.date.toLocaleString('pl-PL', {
            weekday: "long"
        });
        obj.start_at = obj.start_at.slice(0, 5);
        obj.end_at = obj.end_at.slice(0, 5);
    });
    return arr;
};


module.exports = {
    addId: addId,
    datetimeFormatter: datetimeFormatter
};