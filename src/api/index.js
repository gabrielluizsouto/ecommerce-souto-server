import { Router } from 'express'
import { Low, JSONFile } from 'lowdb'

// Use JSON file for storage
const adapter = new JSONFile('./src/database/database.json');
const db = new Low(adapter);

// routes/endpoints
const router = Router();


router.get('/', async (req, res) => {
    try{
        await db.read();
        const data = await db.data;

        res.status(200).json(data.products);
    } catch(e){
        res.status(500).send(error);
    }
});

router.get('/id/:id', async (req, res) => {
    try{
        await db.read();
        const { products } = await db.data;
        const product = products.find(prod => prod.id == req.params.id);

        res.status(200).json(product);
    } catch(error){
        res.status(500).send(error);
    }
});

// router.post('/name', async (req, res) => {
//     console.log(req.body)
//     // const req_name = req.body.name;
//     // console.log(req_name)

//     try{
//         // await db.read();
//         // const { products } = await db.data;
//         // const prods = products.filter(prod => {
//             // return prod.name.indexOf(req_name) >= 0
//         // });

//         res.status(200).send('res');
//     } catch(error){
//         res.status(500).send(error);
//     }
// });

export default router