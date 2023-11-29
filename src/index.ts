const express = require('express') 
const app = express();
import usersRouter from './routes/users';

app.use("/users", usersRouter);
app.use("/drivers", usersRouter);

app.listen(3000, ()=> console.log('server on port 3000'))
