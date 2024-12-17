const Client = require('../models/clientModel');

exports.createClient = async (req, res) => {
  try {
    const { name, CPF, email, phone, address, birthdate } = req.body;
    const client = new Client({ name, CPF, email, phone, address, birthdate });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
  }
};