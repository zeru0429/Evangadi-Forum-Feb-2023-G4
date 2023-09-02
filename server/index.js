import express from 'express';

server.listen(port, host, (error) => { 
    if (error) console.log(error);
    console.log(`http://${host}:${[port]}`);
});
