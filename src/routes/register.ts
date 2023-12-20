import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req: any, res: any) => {
    connectionDB.query("SELECT register.start_date, register.end_date, customer.name AS name_c, customer.lastname AS lastname_c, customer.photo AS photo_c, customer.phone AS phone_c FROM register, customer, routes, drivers,users WHERE register.routes_id = routes.id_routes AND routes.driver_id = drivers.id_driver AND register.customer_id = customer.id_customer AND drivers.user_id = users.id_user AND users.id_user = $1", [req.params.id], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

router.post('', (req: any, res: any) => {
    try {
        const idRoute = req.body.idRoute;
        const idCustomer = req.body.customer;
        connectionDB.query("INSERT INTO register(start_date, end_date, routes_id, customer_id) VALUES (CURRENT_DATE, CURRENT_DATE + INTERVAL '1 month', $1, $2)", [idRoute, idCustomer], (error: any, results: any) => {
            if (error) {
                console.error(error);
                res.json('Error al crear el registro');
              } else {
                res.json('Registro creado');
              }
        }
        );
    } catch (error) {
        console.error(error);
        res.json('Error al crear el registro');
    }
});
export default router; 