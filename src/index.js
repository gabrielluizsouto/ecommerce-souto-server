import express from "express";
import cors from "cors";
import routes from './api/index.js'


const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors());
app.use(routes);

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});