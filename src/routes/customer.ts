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
export default router;