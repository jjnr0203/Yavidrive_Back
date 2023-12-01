import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/', (req, res) => {
    connectionDB.query("SELECT * FROM users where cedula = $1 && password = $2",
    [req.body.user,req.body.password], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(JSON.stringify('Usuario encontrado'))
    });
});

export default router;