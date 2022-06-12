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
        //  Portfolio Data
        app.get("/portfolio", async (req, res) => {
            const query = {};
            result = await portfolioCollection.find(query).toArray();
            res.send(result);
        });
        //  Portfolio Data One
        app.get("/portfolioOne", async (req, res) => {
            const id = req.query.id;
            const query = { _id: ObjectId(id) };
            const result = await portfolioCollection.findOne(query);

            res.send(result);
        });

        // Add contact
        app.post("/contact", async (req, res) => {
            const contact = req.body.contact;
            // console.log(contact);
            const result = await portfolioCollection.insertOne(contact);
            return res.send({ result, success: true });
        });
    } finally {
    }
}

runServer().catch(console.error);
app.listen(port, () => {
    console.log("listening to the port ", port);
});
