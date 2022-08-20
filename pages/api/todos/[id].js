import { database as db } from "./index";

export default function handler(req, res) {
  if (req.query.id) {
    switch (req.method) {
      case "GET": {
        let data = db.get("todos");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );

        if (index > -1) {
          res.status(200).json(data[index]);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      case "PATCH": {
        let data = db.get("todos");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );

        if (index > -1) {
          if ("title" in req.body) data[index].title = req.body.title;
          if ("checked" in req.body) data[index].checked = req.body.checked;
          if ("pinned" in req.body) data[index].pinned = req.body.pinned;

          db.set("todos", data);
          res.status(200).json(data[index]);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      case "DELETE": {
        let data = db.get("todos");
        let index = data.findIndex(
          (data) => data.id === parseInt(req.query.id)
        );

        if (index > -1) {
          let response = data[index];
          data.splice(index, 1);
          db.set("todos", data);
          res.status(200).json(response);
        } else {
          res.status(404).json({ message: "Not Found" });
        }

        break;
      }
      default:
        res.status(405).json({ message: "Method Not Allowed" });
    }
  } else res.status(404).json({ message: "Not Found" });
}
