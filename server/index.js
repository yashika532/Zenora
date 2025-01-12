import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './Connection/conn.js';

dotenv.config({
  path: './.env',
});
connectDB();
const port = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
