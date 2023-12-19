import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.post('/',(req,res)=>{
    try {
        connectionDB.query('Insert into vehicle(registration, color, model, brand, num_seats,driver_id) values ($1,$2,$3,$4,$5,$6) ', [req.body.registration,req.body.color,req.body.model,req.body.brand,req.body.numSeats,req.body.idDriver,])
        res.json('vehiculo creado exitosamente')
    } catch (error) {
        console.log(error);
        res.json('Error al crear el vehiculo')
    }
})

router.put('/:id', (req:any, res:any)=>{
  connectionDB.query('UPDATE vehicle set registration = $1, model = $2, brand = $3, color = $4, num_seats = $5 WHERE vehicle.driver_id = $6 ', [req.body.registration, req.body.model, req.body.brand, req.body.color, req.body.numseats, req.params.id])
})

router.get('/:id', (req: any, res: any) => {
    connectionDB.query("select vehicle.registration, vehicle.model, vehicle.brand, vehicle.color, vehicle.num_seats as numSeats, vehicle.driver_id as idDriver from vehicle, drivers, users where drivers.user_id = users.id_user and vehicle.driver_id = drivers.id_driver and users.id_user = $1", [req.params.id], (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.send(results.rows[0]);
    });
  });

export default router;
