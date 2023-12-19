import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req : any, res : any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, customer.name AS name_c, customer.lastname AS lastname_c, customer.photo AS photo_c, customer.phone AS phone_c FROM register, customer, routes, drivers,users WHERE register.routes_id = routes.id_routes AND routes.driver_id = drivers.id_driver AND register.customer_id = customer.id_customer AND drivers.user_id = users.id_user AND users.id_user = $1", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
        console.log("datos de los clientes");
    });
});

export default router;