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

export default router;
