const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 

const app = express(); 
const PORT = 3000; 


app.use(express.json()); 
app.use('/images', express.static(path.join(__dirname, 'public/images'))); 

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/welcome.html'));
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
 });