const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken');

exports.createClient = async (req, res) => {
  try {
    const { name, CPF, email, phone, DateOfBirth, password, address, cards } = req.body;
    if (!name || !CPF || !email || !phone || !DateOfBirth || !password || !address) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const client = new Client({ name, CPF, email, phone, DateOfBirth, password, address, cards });
    await client.save();
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente', error: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar por clientes cadastrados', error: error.message });
  }
};

exports.loginClient = async (req, res) => {
  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ email });
    if (!client || client.password !== password) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};