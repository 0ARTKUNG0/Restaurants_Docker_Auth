import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
  res.send('Restaurant Useful API 555')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});