import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req, res) => {
    connectionDB.query("SELECT customer.name as name_c, customer.photo, customer.lastname, roles.name FROM customer, users, roles WHERE customer.user_id = users.id_user AND users.id_user = $1 AND roles.id_role = users.role_id",
    [req.params.id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.send(results.rows[0]);
        });
});

router.get('/drivers/:id', (req, res) => {
    connectionDB.query("SELECT drivers.name as name_d, drivers.photo, drivers.lastname, roles.name FROM drivers, users, roles WHERE drivers.user_id = users.id_user AND users.id_user = $1 AND roles.id_role = users.role_id",
    [req.params.id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.send(results.rows[0]);
        });
    
});






export default router;