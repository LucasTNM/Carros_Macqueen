const Client = require('../models/clientModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.createClient = async (req, res) => {
  try {
    const { name, CPF, email, phone, DateOfBirth, password, address, cards } = req.body;
    if (!name || !CPF || !email || !phone || !DateOfBirth || !password || !address) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: 'A senha deve ter no mínimo 8 dígitos, um caractere especial e uma letra maiúscula' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const client = new Client({ name, CPF, email, phone, DateOfBirth, password: hashedPassword, address, cards });
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

exports.deleteClient = async (req, res) => {
  try {
    const { cpf } = req.params;
    const client = await Client.findOneAndDelete({ CPF: cpf });
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json({ message: 'Cliente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
  }
};

exports.loginClient = async (req, res) => {
  console.log("Requisição recebida:", req.body); // 🔥 Debug

  const { email, password } = req.body;
  try {
    const client = await Client.findOne({ email: email.trim().toLowerCase() });

    if (!client) {
      console.log("Email não encontrado:", email);
      return res.status(401).json({ message: "Email inválido" });
    }

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      console.log("Senha incorreta para:", email);
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Login bem-sucedido! Token gerado:", token); // 🔥 Debug

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res.status(201).json({ success: true, token, message: "Você fez login com sucesso." });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
};
