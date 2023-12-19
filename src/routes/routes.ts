import express, { json, response } from 'express';
import connectionDB from '../database';

const router = express.Router();

router.get('/', (req, res)=>{
    connectionDB.query("SELECT * FROM routes, drivers where routes.driver_id = drivers.id_driver", (error, results)=>{
        if(error){
            throw error;
        }
        res.send(results.rows);
    });
});

router.get("/:id", (req, res)=>{
    connectionDB.query("SELECT routes.description, routes.zone_id, routes.price, routes.availability, routes.id_routes FROM  routes,drivers,users where routes.driver_id = drivers.id_driver and drivers.user_id = users.id_user and users.id_user = $1",[req.params.id],(error, results)=>{
        if(error){
            throw error;
        }
        res.send(results.rows[0])
    });
});

router.put('/:id',(req:any, res:any)=>{
    connectionDB.query('UPDATE routes set description = $1, zone_id = $2, availability = $3, driver_id = $4, price = $5 WHERE routes.id_routes = $6',
    [req.body.description, req.body.id_zone, req.body.availability,req.body.driverId,req.body.price, req.params.id],(error:any,results:any)=>{
        if(error){
            throw error;
        }
        res.json('Actualizado Exitosamente')
    });
});

router.post('/', (req:any, res:any)=>{
    const idZone = JSON.parse(req.body.id_zone)
    connectionDB.query('INSERT INTO routes (description,driver_id, zone_id, availability, price) VALUES ($1, $2, $3, $4,$5)',[req.body.description, req.body.driverId,idZone, req.body.availability,req.body.price],(error:any, results:any)=>{
        if(error){
            throw error;
        }
        res.json('Creado Exitosamente')
    });
});

router.delete('/:id', (req, res)=>{
    connectionDB.query('DELETE FROM routes where id_routes = $1',[req.params.id], (error,results)=>{
        if(error){
            throw error;
        }
        res.json('Borrado')
    });
});


export default router;