const Client = require('../models/clientModel');

exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
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

exports.getClientByCPF = async (req, res) => {
  try {
    const client = await Client.findOne({ CPF: req.params.cpf });
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
  }
};

exports.updateClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
};

exports.deleteClientById = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
  }
};