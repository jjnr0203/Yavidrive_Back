import express, { response } from 'express';
import connectionDB from '../database';
const router = express.Router();
router.use(express.json());

router.post('/', (req, res) => {
<<<<<<< HEAD
    try {
        connectionDB.query("SELECT * FROM users where email = $1 or cedula = $1 and password = $2",
            [req.body.user, req.body.password], (error, results) => {
                if (results.rows.length > 0) {
                    res.send(results.rows)
                } else {
                    res.json('usuario no encontrado')
                }
=======
    connectionDB.query("SELECT * FROM users where email = $1 or cedula = $1 and password = $2",
    [req.body.user,req.body.password], (error, results) => {
        if (results.rows.length > 0) {
            res.send(results.rows[0]);
        }else{
            res.json('usuario no encontrado')
        }
>>>>>>> 6b1626c52b419acf4108092518c27fde7057e482

            });
    } catch (error) {
        res.send('error al validar los datos')
        console.log(error)
    }
});

export default router;