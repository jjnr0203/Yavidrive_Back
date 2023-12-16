const express = require('express') 
const app = express();
import connectionDB from './database';
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import routesRouter from './routes/routes';
import registerRouter from './routes/register';
import vehicleRouter from './routes/vehicle';
import driversRouter from './routes/drivers';
import homeRouter from './routes/home';
import customerRouter from './routes/customer';
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/routes", routesRouter);
app.use("/register", registerRouter);
app.use("/vehicle", vehicleRouter);
app.use("/drivers", driversRouter);
app.use("/home", homeRouter);
app.use("/customer", customerRouter);

app.get('/roles', (req:any, res:any) => {
    connectionDB.query("SELECT * FROM roles", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

app.get('/zone', (req:any, res:any) => {
    connectionDB.query("SELECT * FROM zone", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

app.listen(3000, ()=> console.log('server on port 3000'))
