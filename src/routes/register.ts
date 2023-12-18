import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req : any, res : any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, customer.name AS name_c, customer.lastname AS lastname_c, customer.photo AS photo_c, customer.phone AS phone_c FROM register, customer, routes, drivers WHERE register.customer_id=$1  AND customer.id_customer=$1 AND register.routes_id=routes.id_routes AND routes.driver_id=drivers.id_driver", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos de los clientes");
    });
});

export default router;