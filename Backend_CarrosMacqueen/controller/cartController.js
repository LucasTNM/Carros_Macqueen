const Client = require('../models/clientModel');
const Car = require('../models/carModel');
const Cart = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { username, carName } = req.body;
    console.log('Requisição para adicionar ao carrinho recebida');
    console.log('username:', username);
    console.log('carName:', carName);

    // Buscar o cliente pelo username
    const client = await Client.findOne({ username }).populate('cart');
    if (!client) {
      console.log('Cliente não encontrado');
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    console.log('Cliente encontrado:', client);

    // Buscar o carro pelo nome
    const car = await Car.findOne({ name: carName });
    if (!car) {
      console.log('Carro não encontrado');
      return res.status(404).json({ message: 'Carro não encontrado' });
    }
    console.log('Carro encontrado:', car);

    let cart = client.cart;
    if (!cart) {
      console.log('Carrinho não encontrado, criando novo carrinho');
      cart = new Cart({ client: client.CPF, items: [] }); // Usar client.CPF
      client.cart = cart._id;
      await client.save();
    } else {
      console.log('Carrinho encontrado:', cart);
    }

    const cartItem = cart.items.find(item => item.car.toString() === car._id.toString());
    if (cartItem) {
      console.log('Item já existe no carrinho, aumentando quantidade');
      cartItem.quantity += 1;
    } else {
      console.log('Item não existe no carrinho, adicionando novo item');
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
    console.log('Requisição para buscar carrinho recebida');
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

exports.removeFromCart = async (req, res) => {
  try {
    const { cpf, carName } = req.params;
    console.log('Requisição para remover item do carrinho recebida');
    console.log('cpf:', cpf);
    console.log('carName:', carName);

    const cart = await Cart.findOne({ client: cpf }).populate('items.car');
    if (!cart || !cart.items || cart.items.length === 0) {
      console.log('Carrinho não encontrado ou vazio');
      return res.status(404).json({ message: "Carrinho não encontrado ou vazio" });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.car.name.toLowerCase() !== carName.toLowerCase());

    if (cart.items.length === initialLength) {
      console.log('Item não encontrado no carrinho');
      return res.status(404).json({ message: "Item não encontrado no carrinho" });
    }

    await cart.save();

    console.log('Item removido do carrinho com sucesso');
    res.status(200).json({ message: "Item removido do carrinho com sucesso", items: cart.items });
  } catch (error) {
    console.error('Erro ao remover item do carrinho', error);
    res.status(500).json({ message: "Erro ao remover item do carrinho", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const { cpf } = req.params;
    console.log('Requisição para limpar carrinho recebida');
    console.log('cpf:', cpf);

    const cart = await Cart.findOne({ client: cpf });
    if (!cart) {
      console.log('Carrinho não encontrado');
      return res.status(404).json({ message: 'Carrinho não encontrado' });
    }

    cart.items = [];
    await cart.save();

    console.log('Carrinho limpo com sucesso');
    res.status(200).json({ message: 'Carrinho limpo com sucesso', cart });
  } catch (error) {
    console.error('Erro ao limpar o carrinho', error);
    res.status(500).json({ message: 'Erro ao limpar o carrinho', error: error.message });
  }
};