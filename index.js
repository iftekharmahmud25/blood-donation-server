const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middlewares

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://bloodDonation:S3VgjIz74UTBXVol@cluster0.hksneiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
  
    const donorCollection = client.db('donorDb').collection('donor');



    app.post('/donor',async(req,res)=>{
      const newDonor = req.body;
      console.log(newDonor);
      const result = await donorCollection.insertOne(newDonor);
      res.send(result)
    })








   

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("blood donation is running");
});
app.listen(port, () => {
  console.log(`blood donation server is running on port ${port}`);
});
