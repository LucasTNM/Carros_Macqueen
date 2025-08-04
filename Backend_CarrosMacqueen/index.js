const config = require('./config.js');
let IRoutes = require('./routes/'+config.IRoutes);
let carRoutes = new IRoutes();
    carRoutes.get();
    carRoutes.post();
    carRoutes.put();
    carRoutes.delete();
    carRoutes.listen();
