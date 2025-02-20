const Card = require('../models/cardModel');
const Client = require('../models/clientModel');

exports.addCard = async (req, res) => {
  try {
    const { cardType, cardNumber, cardExpiry, cardCVV, fullName, clientCPF } = req.body;

    const client = await Client.findOne({ CPF: clientCPF });
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }

    const card = new Card({ cardType, cardNumber, cardExpiry, cardCVV, fullName, clientCPF });
    await card.save();

    client.cards.push(card._id);
    await client.save();

    res.status(201).json({ message: 'Cartão adicionado com sucesso', card });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar cartão', error: error.message });
  }
};

exports.getCardsByClientCPF = async (req, res) => {
  try {
    const { clientCPF } = req.params;

    const cards = await Card.find({ clientCPF });
    if (!cards.length) {
      return res.status(404).json({ message: 'Nenhum cartão encontrado para este cliente' });
    }

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cartões', error: error.message });
  }
};

exports.deleteCard = async (req, res) => {
    try {
      const { cardNumber } = req.params;
  
      const card = await Card.findOneAndDelete({ cardNumber });
      if (!card) {
        return res.status(404).json({ message: 'Cartão não encontrado' });
      }
  
      // Remover o cartão da lista de cartões do cliente
      await Client.updateOne({ CPF: card.clientCPF }, { $pull: { cards: card._id } });
  
      res.status(200).json({ message: 'Cartão excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao excluir cartão', error: error.message });
    }
  };