const express = require('express') 
const app = express();
import connectionDB from './database';
import usersRouter from './routes/users';
import loginRouter from './routes/login';
import routesRouter from './routes/routes';

const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/routes", routesRouter);



app.get('/roles', (req:any, res:any) => {
    connectionDB.query("SELECT * FROM roles", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

app.listen(3000, ()=> console.log('server on port 3000'))
