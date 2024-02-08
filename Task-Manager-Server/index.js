const express = require('express')
require('dotenv').config();
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(cors({
    origin:[ 'http://localhost:5173',
            'http://localhost:5174',
          'https://task-manager-e7f2e.web.app'],
    credentials:true
}
))
app.use(express.json())





const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://Task-Manager:RmASb9EMUgshfDuf@cluster0.gx7mkcg.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {

    const users = client.db("Task-Manager").collection("users");
    const tasks = client.db("Task-Manager").collection("tasks");


//   USER API

  app.get('/users', async(req, res)=>{
    const result = await users.find().toArray()
    res.send(result)
  })

  app.get('/users/:email', async(req, res)=>{
    const userEmail = req.params?.email
    const query = {email: userEmail}
    const result = await users.findOne(query)
    res.send(result)
  })
  
  app.post(`/users`, async(req, res)=>{
    const user = req.body
    const query = {email : req.body.email} 
    const find = await users.findOne(query)
    if(find){
      return res.send  ({message: 'user already exists', insertedId : null})
    }
    const result = await users.insertOne(user)
    res.send(result)
  })

  // Tasks

  app.get('/tasks', async(req, res)=>{
    const result = await tasks.find().toArray()
    res.send(result)
  })

  app.post(`/tasks`, async(req, res)=>{
    const task = req.body
    const result = await tasks.insertOne(task)
    res.send(result)
  })

  app.delete('/tasks/:id', async(req, res)=>{
    const id = req?.params.id
    const query = {_id : new ObjectId(id)}
    const result = await tasks.deleteOne(query)
    res.send(result)
  })

  app.put('/tasks/:_id', async(req, res)=>{
    const id = req.params._id
  const query = {_id: new ObjectId(id)}
  const options = { upsert: true };
  const updatedTask = req.body
  const task = {
    $set:{
      title: updatedTask.title,
      difficulty: updatedTask.difficulty,
      date: updatedTask.date,
      description: updatedTask.description,
    }
  }
  const result = await tasks.updateOne(query, task, options)
      res.send(result)
})

app.patch('/tasks/:id',  async (req, res) => {
  const id = req.params.id;
  console.log(id)
  const filter = { _id: new ObjectId(id) };
  const updatedSubmittedAssignment = req.body;
  const updateDoc = {
      $set: {
          status: updatedSubmittedAssignment.statuss
      },
  };
  const result = await tasks.updateOne(filter, updateDoc);
  res.send(result);
})


  
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('boss is sitting')
})


app.listen(port, ()=>{
    console.log(`Landlord is sitting on port ${port} `)
})
