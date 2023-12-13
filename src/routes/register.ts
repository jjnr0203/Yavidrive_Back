import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/service', (req, res) => {
    connectionDB.query("SELECT * FROM customer,register, routes, drivers, vehicle, zone WHERE register.customer_id=1  AND customer.id_customer=1 and register.routes_id=routes.id_routes AND routes.driver_id=drivers.id_driver AND vehicle.driver_id=drivers.id_driver AND routes.zone_id=zone.id_zone", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos del servicio");
    });
});

router.get('/clients', (req, res) => {
    connectionDB.query("SELECT * FROM drivers,customer, register, routes, zone WHERE register.customer_id=1  AND customer.id_customer=1 AND register.routes_id=routes.id_routes AND routes.driver_id=drivers.id_driver", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos de los clientes");
    });
});

export default router;