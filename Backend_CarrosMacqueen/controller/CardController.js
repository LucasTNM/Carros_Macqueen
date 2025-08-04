const ICardController = require('./ICardController.js');

const config = require('../config.js');
const CardDAO = require('../persistencelayer/dao/'+config.ICardDAO);
let carddao = new CardDAO();

class CardController extends ICardController{
  constructor(){
    super();
       
  }

  
  async show(req, res)
    {
  
       let cards = await carddao.recovery();
        return res.json(cards);
    }
  async store(req, res)
     {
        try {
          const card =  await carddao.create(req);
          return res.status(201).json(card);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao criar cartão', error: error.message });
        }
     }
   async destroy(req,res){
         try {
           let card = await carddao.delete(req);
           if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
           return res.json({ message: 'Cartão deletado com sucesso' });
         } catch (error) {
           return res.status(500).json({ message: 'Erro ao deletar cartão', error: error.message });
         }
    }
   async update(req,res){
        try {
          let card = await carddao.update(req);
          if (!card) return res.status(404).json({ message: 'Cartão não encontrado' });
          return res.json(card);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao atualizar cartão', error: error.message });
        }
    }

   async index(req,res)
    {
        try {
          let cards = await carddao.search(req);
          return res.json(cards);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar cartões', error: error.message });
        }
    }

   async getByClientCPF(req,res)
    {
        try {
          let cards = await carddao.findByClientId(req.params.cpf);
          return res.json(cards);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar cartões do cliente', error: error.message });
        }
    }
  
}
module.exports = CardController;
