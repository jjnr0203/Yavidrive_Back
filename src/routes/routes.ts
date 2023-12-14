import express, { response } from 'express';
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
    connectionDB.query("SELECT * FROM  routes where id_routes = $1",[req.params.id],(error, results)=>{
        if(error){
            throw error;
        }
        res.send(results.rows)
    });
});

router.put('/:id',(req:any, res:any)=>{

    const idDriver = JSON.parse(req.body.id_driver);
    const idZone = JSON.parse(req.body.id_zone);

    connectionDB.query('UPDATE routes set description = $1, id_driver = $2, id_zone = $3, availability = $4 WHERE id_routes = $5',
    [req.body.description, idDriver, idZone, req.body.availability, req.params.id],(error:any,results:any)=>{
        if(error){
            throw error;
        }
        res.json('Actualizado Exitosamente')
    });
});

router.post('/', (req:any, res:any)=>{
    const idDriver = JSON.parse(req.body.id_driver);
    const idZone = JSON.parse(req.body.id_zone);

    connectionDB.query('INSERT INTO routes (description, id_driver, id_zone, availability) VALUES ($1, $2, $3, $4)',[req.body.description, idDriver, idZone, req.body.availability],(error:any, results:any)=>{
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



router.post('/register',(req:any, res:any)=>{
    const idRoute = JSON.parse(req.body.id_route);
    const idCustomer = JSON.parse(req.body.id_customer);
connectionDB.query("INSERT INTO register(start_date, end_date, routes_id, customer_id) VALUES (CURRENT_DATE,CURRENT_DATE + INTERVAL '1 month' ,$1,$2)",[idRoute, idCustomer],(error:any, results:any)=>{
    if (error) {
        throw error; 
    }
    console.log(Response)
});
}
)

export default router;