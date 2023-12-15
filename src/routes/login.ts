import express, { response } from 'express';
import connectionDB from '../database';
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
    try {
        connectionDB.query("SELECT * FROM users where email = $1 or cedula = $1 and password = $2",
            [req.body.user, req.body.password], (error, results) => {
                if (results.rows.length > 0) {
                    res.send(results.rows[0])
                } else {
                    res.json('usuario no encontrado')
                }

            });
    } catch (error) {
        res.send('error al validar los datos')
        console.log(error)
    }
});

export default router;