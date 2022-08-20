const JSONdb = require("simple-json-db");
export const database = new JSONdb("./pages/api/database.json");

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      res.status(200).json(database.get("todos"));
      break;
    }
    case "POST": {
      console.log(req.body);
      let missingFields = [];
      if (!req.body.title) missingFields.push("title");

      if (missingFields.length === 0) {
        let data = database.get("todos");
        let todo = {
          id: Date.now(),
          title: null,
          checked: false,
          pinned: false,
        };

        if ("title" in req.body) todo.title = req.body.title;

        data.push(todo);
        database.set("todos", data);

        res.status(201).json(todo);
      } else {
        res.status(400).json({
          message: `There is missing fields: ${missingFields.join(", ")}`,
        });
      }

      break;
    }
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}
