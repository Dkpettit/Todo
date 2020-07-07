var bodyParser = require("body-parser");
var mongoose = require("mongoose");

//Connect to the database.....check .env from project1 javascript sem 5
mongoose.connect(
  "mongodb+srv://info3139User:2MrG0DExhMZOm74z@cluster0-vqgwj.mongodb.net/todo?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String,
});

var Todo = mongoose.model("Todo", todoSchema);

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/todo", function (req, res) {
    //get data from MongoDb and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    //get data from the view and add to MongoDb
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function (req, res) {
    //delete the requested item from MongoDb
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
