import express from 'express';
import connectionDB from '../database';
const router = express.Router();

router.get('/:id', (req: any, res: any) => {
  connectionDB.query("select customer.id_customer, customer.name from customer,users where customer.user_id = users.id_user and users.id_user = $1", [req.params.id], (error: any, results: any) => {
    if (error) {
      throw error;
    }
    res.send(results.rows[0]);
  });
});

router.post('/', async (req: any, res: any) => {
  try {
    console.log(req.body)
    const newCustomer = req.body;
    const customer = await connectionDB.query(
      'INSERT INTO customer (name, lastname, photo, phone, user_id) VALUES ($1, $2, $3, $4, $5)RETURNING id_customer',
      [req.body.name, req.body.lastname, req.body.photo, req.body.phone, req.body.user_id]);
    const newCustomerID = {
      id_customer: customer.rows[0].id_customer,
      ...newCustomer
    }
    res.send(newCustomerID);
  } catch (error) {
    res.send('Error al crear el conductor');
    console.log(error);
  }
});

export default router;