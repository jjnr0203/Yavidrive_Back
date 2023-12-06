import express, { response } from 'express';
import connectionDB from '../database';
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
    connectionDB.query("SELECT * FROM users where email = $1 or cedula = $1 and password = $2",
    [req.body.user,req.body.password], (error, results) => {
        if (results.rows.length > 0) {
            res.json('Usuario encontrado');
        }else{
            res.json('usuario no encontrado')
        }

    });
});

export default router;