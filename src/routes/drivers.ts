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

router.get('/:id', (req: any, res: any) => {
  connectionDB.query("select * from drivers,users where drivers.user_id_d = users.id_user and users.id_user = $1", [req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.send(results.rows[0]);
  });
});

router.put('/:id', (req: any, res: any) => {
  connectionDB.query("update users set cedula=$1, password=$2, email=$3, id_role=$4 where id_user = $5",
    [req.body.cedula, req.body.password, req.body.email, req.body.id_role, req.params.id], (error: any, results: any) => {
      if (error) {
        throw error;
      }
      res.json('Actualizado exitosamente');
    });
});

router.post('/', async (req: any, res: any) => {
  try {
    const newDriver = req.body;
    const driver = await connectionDB.query(
      'INSERT INTO drivers (name_d, lastname_d, photo_d, phone_d,user_id_d) VALUES ($1, $2, $3, $4, $5)RETURNING id_driver',
      [req.body.name, req.body.lastname, req.body.photo, req.body.phone, req.body.user_id]);
    const newDriverID = {
      id_driver: driver.rows[0].id_driver,
      ...newDriver
    }
    res.send(newDriverID);
  } catch (error) {
    res.send('Error al crear el conductor');
    console.log(error);
  }
});


router.delete("/:id", (req: any, res: any) => {
  connectionDB.query("delete from users where id_user = $1", [req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.json('eliminado correctamente');
  });
});

export default router;


