import express, { response } from 'express';
import connectionDB from '../database';
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
    console.log(req.body)
    try {
        connectionDB.query("SELECT * FROM users where password = $1 and (users.email = $2 or users.cedula = $2)",
            [req.body.password, req.body.user], (error, results) => {
                res.send(results.rows[0])
            });
    } catch (error) {
        res.send('error al validar los datos')
        console.log(error)
    }
});

export default router;