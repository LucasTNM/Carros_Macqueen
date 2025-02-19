const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Função auxiliar para criar um cliente
const handleClientCreation = async (clientData) => {
  const { name, CPF, email, phone, DateOfBirth, password, address, cards } =
    clientData;

  // Verifica se todos os campos obrigatórios foram preenchidos
  if (
    !name ||
    !CPF ||
    !email ||
    !phone ||
    !DateOfBirth ||
    !password ||
    !address
  ) {
    throw new Error("Preencha todos os campos");
  }

  // Valida a senha (mínimo 8 caracteres, 1 maiúscula e 1 caractere especial)
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "A senha deve ter no mínimo 8 dígitos, um caractere especial e uma letra maiúscula"
    );
  }

  // Criptografa a senha
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Cria um novo cliente
  const client = new Client({
    name,
    CPF,
    email,
    phone,
    DateOfBirth,
    password: hashedPassword,
    address,
    cards,
  });

  await client.save();
  return client;
};

// Controller para criar cliente (usado para outras funções)
exports.createClient = async (req, res) => {
  try {
    const client = await handleClientCreation(req.body);
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: "Erro ao buscar por clientes cadastrados",
      error: error.message,
    });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const { cpf } = req.params;
    const client = await Client.findOneAndDelete({ CPF: cpf });
    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.status(200).json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar cliente", error: error.message });
  }
};

exports.loginClient = async (req, res) => {

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

    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Login bem-sucedido! Token gerado:", token); // 🔥 Debug

    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      partitioned: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
    });

    res
      .status(201)
      .json({ success: true, token, message: "Você fez login com sucesso." });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};

// Controller de cadastro de cliente
exports.cadastroClient = async (req, res) => {
  try {
    const { email } = req.body;

    // Verifica se o e-mail já está cadastrado
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    // Cria o cliente usando a função reutilizável
    const newClient = await handleClientCreation(req.body);

    // Gera um token JWT para autenticação
    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Cadastro realizado com sucesso!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao cadastrar cliente", error: error.message });
  }
};
