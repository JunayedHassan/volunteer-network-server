const express = require('express');

const app = express();

app.get('/', (req, res) =>{
    res.send("Thanks for calling me")
})

app.listen(3000, () => console.log('object'));