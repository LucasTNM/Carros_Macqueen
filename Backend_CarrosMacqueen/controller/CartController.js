const ICartController = require('./ICartController.js');

const config = require('../config.js');
const CartDAO = require('../persistencelayer/dao/'+config.ICartDAO);
let cartdao = new CartDAO();

class CartController extends ICartController{
  constructor(){
    super();
       
  }

  
  async show(req, res)
    {
  
       let carts = await cartdao.recovery();
        return res.json(carts);
    }
  async store(req, res)
     {
        try {
          const cart =  await cartdao.create(req);
          return res.status(201).json(cart);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao criar carrinho', error: error.message });
        }
     }
   async destroy(req,res){
         try {
           let cart = await cartdao.delete(req);
           if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado' });
           return res.json({ message: 'Carrinho deletado com sucesso' });
         } catch (error) {
           return res.status(500).json({ message: 'Erro ao deletar carrinho', error: error.message });
         }
    }
   async update(req,res){
        try {
          let cart = await cartdao.update(req);
          if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado' });
          return res.json(cart);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao atualizar carrinho', error: error.message });
        }
    }

   async index(req,res)
    {
        try {
          let carts = await cartdao.search(req);
          return res.json(carts);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar carrinho', error: error.message });
        }
    }

   async getByClientId(req,res)
    {
        try {
          let cart = await cartdao.findByClientId(req.params.clientId);
          return res.json(cart);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar carrinho do cliente', error: error.message });
        }
    }

    async clearCart(req,res)
    {
        try {
          let cart = await cartdao.clearByClientId(req.params.clientId);
          return res.json(cart);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao limpar carrinho', error: error.message });
        }
    }

    // Métodos adicionais para manter funcionalidades existentes
    async addItemToCart(req, res) {
      try {
        const Cart = require('../persistencelayer/models/Cart');
        const { client, carId, quantity = 1 } = req.body;

        let cart = await Cart.findOne({ client });
        if (!cart) {
          cart = new Cart({ client, items: [] });
        }

        const existingItemIndex = cart.items.findIndex(item => item.car.toString() === carId);

        if (existingItemIndex > -1) {
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          cart.items.push({ car: carId, quantity });
        }

        await cart.save();
        await cart.populate('items.car');

        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar item ao carrinho', error: error.message });
      }
    }

    async removeItemFromCart(req, res) {
      try {
        const Cart = require('../persistencelayer/models/Cart');
        const { client, carId } = req.body;

        const cart = await Cart.findOne({ client });
        if (!cart) {
          return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        cart.items = cart.items.filter(item => item.car.toString() !== carId);
        await cart.save();
        await cart.populate('items.car');

        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao remover item do carrinho', error: error.message });
      }
    }

    async updateItemQuantity(req, res) {
      try {
        const Cart = require('../persistencelayer/models/Cart');
        const { client, carId, quantity } = req.body;

        const cart = await Cart.findOne({ client });
        if (!cart) {
          return res.status(404).json({ message: 'Carrinho não encontrado' });
        }

        const item = cart.items.find(item => item.car.toString() === carId);
        if (!item) {
          return res.status(404).json({ message: 'Item não encontrado no carrinho' });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.car');

        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar quantidade do item', error: error.message });
      }
    }
  
}
module.exports = CartController;
