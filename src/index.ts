const express = require('express') 
const app = express();
import usersRouter from './routes/users';
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);

app.listen(3000, ()=> console.log('server on port 3000'))
