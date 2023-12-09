import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/', (req, res) => {
    connectionDB.query("SELECT * FROM customer,register, routes, drivers, vehicle, zone WHERE register.id_customer=1 AND register.id_routes=routes.id_routes AND routes.id_driver=drivers.id_driver AND vehicle.id_driver=drivers.id_driver AND routes.id_zone=zone.id_zone", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

export default router;