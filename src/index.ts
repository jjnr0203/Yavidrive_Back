const express = require('express') 
const app = express();
import connectionDB from './database';
import usersRouter from './routes/users';
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.get('/roles', (req:any, res:any) => {
    connectionDB.query("SELECT * FROM roles", (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results.rows);
    });
});

app.listen(3000, ()=> console.log('server on port 3000'))
