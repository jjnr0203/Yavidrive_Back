import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req : any, res : any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, routes.description, routes.price, zone.name AS name_z, drivers.name AS name_d, drivers.lastname AS lastname_d, drivers.photo AS photo_d, drivers.phone AS phone_d, vehicle.registration, vehicle.color, vehicle.model, vehicle.brand FROM register,  routes,  zone, drivers, vehicle, customer WHERE register.id_customer=$1  AND customer.id_customer=$1 and register.id_routes=routes.id_routes AND routes.id_driver=drivers.id_driver AND vehicle.id_driver=drivers.id_driver AND routes.id_zone=zone.id_zone", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos del servicio");
    });
});

router.get('/d/:id', (req : any, res : any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, customer.name AS name_c, customer.lastname AS lastname_c, customer.photo AS photo_c, customer.phone AS phone_c FROM register, customer, routes, drivers WHERE register.id_customer=$1  AND customer.id_customer=$1 AND register.id_routes=routes.id_routes AND routes.id_driver=drivers.id_driver", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows[0]);
        console.log("datos de los clientes");
    });
});

export default router;