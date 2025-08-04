const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require("../config/db");

const IRoutes = require('./IRoutes.js');

const app = express();

dotenv.config();
connectDB();

const config = require('../config.js');
let CarController = require('../controller/'+config.ICarController);
let ClientController = require('../controller/'+config.IClientController);
let CartController = require('../controller/'+config.ICartController);
let CardController = require('../controller/'+config.ICardController);

let carController = new CarController();
let clientController = new ClientController();
let cartController = new CartController();
let cardController = new CardController();

const allowedOrigins = [
  'https://carros-macqueen-frontend.vercel.app',
  'http://localhost:5173',
  'https://carrosmacqueen.vercel.app'
];

class CarRoutes extends IRoutes{

  constructor() {   
    super();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));  
    
    app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin) return callback(null, true);
          if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
} 

  get(){
      app.get('/', (req, res) => {
      res.redirect("/api/cars");
      });
      
      // Car routes
      app.get('/api/cars', carController.show);
      app.get('/api/cars/search', carController.index);
      app.get('/api/cars/name/:name', carController.getByName);
      app.get('/api/cars/class/:class', carController.getCarsByClass);
      app.get('/api/cars/year/:year', carController.getCarsByYear);
      app.get('/api/cars/price/:min/:max', carController.getCarsByPriceRange);
      app.get('/api/cars/recent', carController.getRecentCars);
      app.get('/api/cars/expensive', carController.getExpensiveCars);
      
      // Client routes
      app.get('/api/clients', clientController.show);
      app.get('/api/clients/search', clientController.index);
      app.get('/api/clients/email/:email', clientController.getByEmail);
      
      // Cart routes
      app.get('/api/cart', cartController.show);
      app.get('/api/cart/search', cartController.index);
      app.get('/api/cart/client/:clientId', cartController.getByClientId);
      
      // Card routes
      app.get('/api/cards', cardController.show);
      app.get('/api/cards/search', cardController.index);
      app.get('/api/cards/client/:cpf', cardController.getByClientCPF);
  }
  
  post(){
    // Car routes
    app.post('/api/cars', carController.store);
    
    // Client routes
    app.post('/api/clients', clientController.store);
    app.post('/api/clients/login', clientController.login);
    app.post('/api/clients/reset-password', clientController.resetPassword);
    app.post('/api/clients/verify-reset-code', clientController.verifyResetCode);
    app.post('/api/clients/update-password', clientController.updatePassword);
    
    // Cart routes
    app.post('/api/cart', cartController.store);
    app.post('/api/cart/add', cartController.addItemToCart);
    app.post('/api/cart/remove', cartController.removeItemFromCart);
    app.post('/api/cart/update-quantity', cartController.updateItemQuantity);
    
    // Card routes
    app.post('/api/cards', cardController.store);
  }

  put(){
    // Car routes
    app.put('/api/cars/:id', carController.update);
    app.put('/api/cars/image/:name', carController.updateCarImageByName);
    
    // Client routes
    app.put('/api/clients/:id', clientController.update);
    
    // Cart routes
    app.put('/api/cart/:id', cartController.update);
    
    // Card routes
    app.put('/api/cards/:id', cardController.update);
  }

  delete(){
    // Car routes
    app.delete('/api/cars/:id', carController.destroy);
    
    // Client routes
    app.delete('/api/clients/cpf/:cpf', clientController.destroy);
    
    // Cart routes
    app.delete('/api/cart/:id', cartController.destroy);
    app.delete('/api/cart/clear/:clientId', cartController.clearCart);
    
    // Card routes
    app.delete('/api/cards/:id', cardController.destroy);
  }

  listen(){
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Rest API com Polimorfismo - Servidor rodando na porta ${PORT}`));
  }

}
module.exports = CarRoutes;