/**
 * Created by Matthew on 3/1/2015.
 */
var fs = require('fs');
var fileName = "dl1.txt";

exports.writeToLog = function(message) {
 /*   fs.readFile("drawingLog/dl1.txt","utf8",function(err,data) {
        if (err) {
            console.log(err);
        } else {
            var obj = JSON.parse(data);
            obj.push(message);
            var newLog = JSON.stringify(obj);
            fs.writeFile("drawingLog/dl1.txt", newLog, "utf8", function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("log written");
                }
            });
        }
    });*/
};

exports.readLog = function(callback){
    /*fs.readFile("drawingLog/dl1.txt","utf8",function(err,data){
        if (err) throw err;
        callback(data);
    });*/
};
