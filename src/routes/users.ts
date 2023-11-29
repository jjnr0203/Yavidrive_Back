import express from 'express';
import connectionDB from '../database';


const router = express.Router();

router.get('', (req, res) => {
    connectionDB.query("SELECT * FROM users", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

router.put('/' ,(req:any,res:any)=>{
    res.send("put working")
})

router.post('/' ,(req:any,res:any)=>{
    res.send("post working")
})
router.delete('/' ,(req:any,res:any)=>{
    res.send("delete working")
})

export default router;