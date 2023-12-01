import express, { response } from 'express';
import connectionDB from '../database';
const router = express.Router();
router.use(express.json());

router.get('/', (req, res) => {
    connectionDB.query("SELECT * FROM users where email = $1 or cedula = $1 and password = $2",
    [req.body.user,req.body.password], (error, results) => {
        if (results.rows.length > 0) {
            res.send(JSON.stringify('Usuario encontrado'));
        }else{
            res.send (JSON.stringify('Usuario no encontrado'))
        }

    });
});

export default router;