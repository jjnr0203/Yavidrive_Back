import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/', (req, res) => {
    connectionDB.query("SELECT * FROM users", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

router.get("/:id", (req: any, res: any) => {
    connectionDB.query("select * from users where id_user = $1",[req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.send(results.rows);
  });
  });

  router.put('/:id', (req: any, res: any) => {
    connectionDB.query("update users set cedula=$1, password=$2, email=$3, id_role=$4 where id_user = $5",
    [req.body.cedula,req.body.password,req.body.email,req.body.id_role, req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.json('Actualizado exitosamente');
  });
  });

  router.post('/', async(req: any, res: any) => {
    const idRole = JSON.parse(req.body.id_role);
    try {
      const newUser = req.body
      const user= await connectionDB.query('INSERT INTO users (cedula, password, email, role_id) VALUES ($1, $2, $3, $4) RETURNING id_user',
        [req.body.cedula, req.body.password, req.body.email, idRole]);
        
      const newUserId = {
        id_user : user.rows[0].id_user,
        ...newUser
      }  
        res.send(newUserId);
      } catch (error){
        res.send('Error al crear el usuario');
        console.log(error)
    }
  });


router.delete("/:id", (req: any, res: any) => {
    connectionDB.query("delete from users where id_user = $1",[req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.json('eliminado correctamente');
  });
  });

export default router;
