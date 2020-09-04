const sql = require("./db.js");

// constructor
const Interview = function (interview) {
    this.Interviewer = interview.Interviewer;
    this.Interviewee = interview.Interviewee;
    this.startDate = interview.startDate;
    this.endDate = interview.endDate;
    this.startTime = interview.startTime;
    this.endTime = interview.endTime;

};
check = (newInterview, res) => {
    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = newInterview;
    var x = startDate + ' ' + startTime;
    var y = endDate + ' ' + endTime;
    if (!(Interviewer && Interviewee && startDate && startTime && endDate && endTime)) {
        // result({ message: "Enter all values to check" }, null);
        return { message: "Enter all values" };
    }
    var start = new Date(x);
    var end = new Date(y);
    // console.log(start,end);
    if (start.getTime() > end.getTime()) {
        // res.send("start time is less then end time");
        return { message: "Start time is greater than end time" };
    }
    return { message: "" };
}
checkIfCreatePossible = (newInterview, result) => {
    var d1 = new Date(newInterview.startDate);
    var d2 = new Date(newInterview.endDate);
    var x1 = d1.toDateString().substring(0, 10) + ' ' + newInterview.startTime;
    var y1 = d2.toDateString().substring(0, 10) + ' ' + newInterview.endTime;
    var newStart = new Date(x1);
    var newEnd = new Date(y1);
    const { Interviewer, Interviewee } = newInterview;
    console.log(newStart, newEnd);

    sql.query(`SELECT * FROM interviews where Interviewer = ? or Interviewee = ?`, [Interviewer, Interviewer], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("interviews: ", res);
        res.map(interview => {
            var x = interview.startDate.toDateString().substring(0, 10) + ' ' + interview.startTime;
            var y = interview.endDate.toDateString().substring(0, 10) + ' ' + interview.endTime;
            var start = new Date(x);
            var end = new Date(y);
            console.log(start.getTime(), end.getTime());
            if ((start.getTime() <= newStart.getTime() && end.getTime() >= newStart.getTime()) || (start.getTime() >= newStart.getTime() && start.getTime() <= newEnd.getTime())) {
                console.log("error: ", "Interviewer Busy");
                result({ message: "Interviewer Busy" }, null);
                return;
            }
        });
    });
    sql.query(`SELECT * FROM interviews where Interviewee = ? OR Interviewer = ?`, [Interviewee, Interviewee], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("interviews: ", res);
        res.map(interview => {
            var x = interview.startDate.toDateString().substring(0, 10) + ' ' + interview.startTime;
            var y = interview.endDate.toDateString().substring(0, 10) + ' ' + interview.endTime;
            var start = new Date(x);
            var end = new Date(y);
            if ((start.getTime() <= newStart.getTime() && end.getTime() >= newStart.getTime()) || (start.getTime() >= newStart.getTime() && start.getTime() <= newEnd.getTime())) {
                console.log("error: ", "Interviewee Busy");
                result({ message: "Interviewee Busy" }, null);
                return;
            }
        });
    });
    result(null, null);
    return;
};
// console.log(x,y);
checkIfUpdatePossible = (req, result) => {
    var id = req.id;
    const newInterview = req.interview;
    var d1 = new Date(newInterview.startDate);
    var d2 = new Date(newInterview.endDate);
    var x1 = d1.toDateString().substring(0, 10) + ' ' + newInterview.startTime;
    var y1 = d2.toDateString().substring(0, 10) + ' ' + newInterview.endTime;
    var newStart = new Date(x1);
    var newEnd = new Date(y1);
    const { Interviewer, Interviewee } = newInterview;
    console.log(newStart, newEnd);

    sql.query(`SELECT * FROM interviews where Interviewer = ? and id NOT IN (?)`, [Interviewer, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("interviews: ", res);
        res.map(interview => {
            var x = interview.startDate.toDateString().substring(0, 10) + ' ' + interview.startTime;
            var y = interview.endDate.toDateString().substring(0, 10) + ' ' + interview.endTime;
            var start = new Date(x);
            var end = new Date(y);
            console.log(start.getTime(), end.getTime());
            if ((start.getTime() <= newStart.getTime() && end.getTime() >= newStart.getTime()) || (start.getTime() >= newStart.getTime() && start.getTime() <= newEnd.getTime())) {
                console.log("error: ", "Interviewer Busy");
                result({ message: "Interviewer Busy" }, null);
                return;
            }
        });
    });
    sql.query(`SELECT * FROM interviews where Interviewee = ? and id NOT IN (?) `, [Interviewee, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("interviews: ", res);

        res.map(interview => {
            var x = interview.startDate.toDateString().substring(0, 10) + ' ' + interview.startTime;
            var y = interview.endDate.toDateString().substring(0, 10) + ' ' + interview.endTime;
            var start = new Date(x);
            var end = new Date(y);
            if ((start.getTime() <= newStart.getTime() && end.getTime() >= newStart.getTime()) || (start.getTime() >= newStart.getTime() && start.getTime() <= newEnd.getTime())) {
                console.log("error: ", "Interviewee Busy");
                result({ message: "Interviewee Busy" }, null);
                // return;
            }

            console.log(interview.id);
        });
        result(null, null);
        return;

    });
};

Interview.create = (newInterview, result) => {

    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = newInterview;
    var start = new Date(startDate + ' UTC');
    var end = new Date(endDate + ' UTC');
    const res = check(newInterview);
    if (res.message) {
        result(res, null);
        return;
    }
    else {
        checkIfCreatePossible(newInterview, (err, data) => {
            if (err) {
                result(err, null);
            }
            else {
                sql.query("INSERT INTO interviews (Interviewer, Interviewee, startDate, endDate, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?)", [Interviewer, Interviewee, start, end, startTime, endTime], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    console.log("created interview: ", { id: res.insertId, ...newInterview });
                    result(null, { id: res.insertId, ...newInterview });
                });
            }
        });
    }
};

Interview.findById = (interviewId, result) => {
    sql.query(` SELECT * FROM interviews WHERE i.id = ${interviewId}`
        , (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found interview: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Interview with the id
            result({ kind: "not_found" }, null);
        });
};

Interview.getAll = result => {
    sql.query(`SELECT * FROM interviews`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        res.map(interview => {
            var x = new Date(interview.startDate);
            interview.startDate = x.toLocaleDateString();
            var y = new Date(interview.endDate);
            interview.endDate = y.toLocaleDateString();

        });
        console.log("interviews: ", res);
        result(null, res);
    });
};

Interview.updateById = (id, interview, result) => {
    const { Interviewer, Interviewee, startDate, endDate, startTime, endTime } = interview;
    var start = new Date(startDate + ' UTC');
    var end = new Date(endDate + ' UTC');
    const res = check(interview);
    if (res.message) {
        result(res, null);
        return;
    }
    else {
        checkIfUpdatePossible({ id, interview }, (err, data) => {
            if (err) {
                result(err, null);
                return;
            }
            else {
                sql.query(
                    "UPDATE interviews SET startDate = ?, endDate = ?, startTime = ?, endTime = ? WHERE id = ?", [start, end, startTime, endTime, id], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        else if (res.affectedRows == 0) {
                            // not found Interview with the id
                            result({ kind: "not_found" }, null);
                            return;
                        }
                        else {
                            console.log("updated interview: ", { id: id, ...interview });
                            result(null, { id: id, ...interview });
                            return;
                        }
                    }
                );
            }
        });
    }

};

Interview.remove = (id, result) => {
    sql.query("DELETE FROM interviews WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted interview with id: ", id);
        result(null, res);
    });
};

// Interview.removeAll = result => {
//     sql.query("DELETE FROM interviews", (err, res) => {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//             return;
//         }

//         console.log(`deleted ${res.affectedRows} interviews`);
//         result(null, res);
//     });
// };

module.exports = Interview;