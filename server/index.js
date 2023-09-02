import express from 'express';
server.get('/', (req, res) => { 
    res.send("ti is working.....");
});



server.listen(port, host, (error) => { 
    if (error) console.log(error);
    console.log(`http://${host}:${[port]}`);
});
