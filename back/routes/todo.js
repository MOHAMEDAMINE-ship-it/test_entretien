const router = require("express").Router();
const Todo = require("../models/todo");

router.post("/", async (req, res) => {

   
        const newtodo=new  Todo({
            title:req.body.title,
            Description:req.body.Description,
            finished:req.body.finished,
            created_at:req.body.created_at,
            finished_at:req.body.finished_at,
            update_at:req.body.update_at,
        })
        try{
            const savedTodo=await newtodo.save();
            res.status(201).json(savedTodo);
        }
        catch(err){
            res.status(500).json(err.message);
        }

})
router.get("/", async (req, res) => {
    try {
        const todoslist = await Todo.find();
       
     console.log(todoslist)

        res.status(200).json({list:todoslist});
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
}  );
router.put("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo.userId === req.body.userId) {
            await todo.updateOne({ $set: req.body });
            res.status(200).json("The todo has been updated");
        } else {
            res.status(403).json("You can update only your todo");
        }   
    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete("/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo.userId === req.body.userId) {
            await todo.deleteOne();
            res.status(200).json("The todo has been deleted");
        } else {
            res.status(403).json("You can delete only your todo");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports=router