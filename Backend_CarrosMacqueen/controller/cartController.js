const Client = require('../models/clientModel');
const Car = require('../models/carModel');
const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { username, carName } = req.body;
    console.log('username:', username);
    console.log('carName:', carName);

    // Buscar o cliente pelo email (username)
    const client = await Client.findOne({ email: username }).populate('cart');
    if (!client) {
      console.log('Cliente não encontrado');
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    // Buscar o carro pelo nome
    const car = await Car.findOne({ name: carName });
    if (!car) {
      console.log('Carro não encontrado');
      return res.status(404).json({ message: 'Carro não encontrado' });
    }

    let cart = client.cart;
    if (!cart) {
      cart = new Cart({ client: client.CPF, items: [] }); // Usar client.CPF
      client.cart = cart._id;
      await client.save();
    }

    const cartItem = cart.items.find(item => item.car.toString() === car._id.toString());
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.items.push({ car: car._id, quantity: 1 });
    }

    await cart.save();

    console.log('Carro adicionado ao carrinho:', cart.items);
    res.status(200).json({ message: 'Carro adicionado ao carrinho', cart: cart.items });
  } catch (error) {
    console.error('Erro ao adicionar carro ao carrinho', error);
    res.status(500).json({ message: 'Erro ao adicionar carro ao carrinho', error: error.message });
  }
};

exports.getCart = async (req, res) => {
    try {
      const { cpf } = req.params;
      console.log('cpf:', cpf);
  
      // Buscar o carrinho pelo CPF do cliente
      const cart = await Cart.findOne({ client: cpf }).populate('items.car');
      if (!cart) {
        console.log('Carrinho não encontrado');
        return res.status(404).json({ message: 'Carrinho não encontrado' });
      }
  
      console.log('Carrinho encontrado:', cart);
      res.status(200).json(cart);
    } catch (error) {
      console.error('Erro ao buscar carrinho', error);
      res.status(500).json({ message: 'Erro ao buscar carrinho', error: error.message });
    }
  };