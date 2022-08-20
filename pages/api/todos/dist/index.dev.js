"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = handler;
exports.database = void 0;

var JSONdb = require("simple-json-db");

var database = new JSONdb("./pages/api/database.json");
exports.database = database;

function handler(req, res) {
  switch (req.method) {
    case "GET":
      {
        res.status(200).json(database.get("todos"));
        break;
      }

    case "POST":
      {
        console.log(req.body);
        var missingFields = [];
        if (!req.body.title) missingFields.push("title");

        if (missingFields.length === 0) {
          var data = database.get("todos");
          var todo = {
            id: Date.now(),
            title: null,
            checked: false,
            pinned: false
          };
          if ("title" in req.body) todo.title = req.body.title;
          data.push(todo);
          database.set("todos", data);
          res.status(201).json(todo);
        } else {
          res.status(400).json({
            message: "There is missing fields: ".concat(missingFields.join(", "))
          });
        }

        break;
      }

    default:
      res.status(405).json({
        message: "Method Not Allowed"
      });
  }
}