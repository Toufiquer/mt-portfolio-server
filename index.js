const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3500;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// Middle were;
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.APP_USER}:${process.env.APP_PASSWORD}@cluster0.gnsf1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

app.get("/", (req, res) => {
    res.send("Node is working.");
});

const portfolioCollection = client
    .db("portfolioCollection")
    .collection("portfolio");
async function runServer() {
    try {
        await client.connect();
        app.get("/", (req, res) => {
            res.send("Node is working");
        });
        // All Portfolio Data
        app.get("/portfolio", async (req, res) => {
            const query = {};
            const result = await portfolioCollection.find(query).toArray();
            res.send(result);
        });
    } finally {
    }
}

runServer().catch(console.error);
app.listen(port, () => {
    console.log("listening to the port ", port);
});
