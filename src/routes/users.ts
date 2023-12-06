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

  router.post('/', (req: any, res: any) => {
    const idRole = JSON.parse(req.body.id_role);
    connectionDB.query(
      'INSERT INTO users (cedula, password, email, id_role) VALUES ($1, $2, $3, $4)',
      [req.body.cedula, req.body.password, req.body.email, idRole],
      (error: any, results: any) => {
        if (error) {
          console.log(error)
          res.send(error);
        } else {
          res.json('Creado exitosamente');
        }
      }
    );
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