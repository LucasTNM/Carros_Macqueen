const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const handleClientCreation = async (clientData) => {
  const { name, CPF, email, phone, DateOfBirth, password, address, cards } = clientData;

  if (!name || !CPF || !email || !phone || !DateOfBirth || !password || !address) {
    throw new Error("Preencha todos os campos");
  }

  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(CPF)) {
    throw new Error("O CPF deve ter exatamente 11 dígitos e conter apenas números");
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordRegex.test(password)) {
    throw new Error("A senha deve ter no mínimo 8 dígitos, um caractere especial e uma letra maiúscula");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

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

exports.getClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
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

    console.log("Login bem-sucedido! Token gerado:", token); 

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

const sendResetEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para 465, false para outras portas
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Código de Redefinição de Senha",
    text: `Você solicitou a redefinição de sua senha. Use o código abaixo para redefinir sua senha:\n\n${code}\n\nSe você não solicitou isso, por favor ignore este email.`,
  };

  await transporter.sendMail(mailOptions);
};

const generateResetCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Gera um código de 4 dígitos
};

exports.passwordReset = async (req, res) => {
  const { email } = req.body;

  try {
    console.log(`Solicitação de redefinição de senha recebida para o email: ${email}`);

    const client = await Client.findOne({ email: email.trim().toLowerCase() });

    if (!client) {
      console.log("Email não encontrado:", email);
      return res.status(404).json({ message: "Email não encontrado" });
    }

    const code = generateResetCode();
    client.resetCode = code;
    client.resetCodeExpires = Date.now() + 3600000; // Código expira em 1 hora
    await client.save();

    console.log(`Código de redefinição gerado: ${code} para o email: ${email}`);

    await sendResetEmail(email, code);

    console.log(`Email de redefinição de senha enviado para: ${email}`);

    res.status(200).json({ message: "Código de redefinição de senha enviado" });
  } catch (error) {
    console.error("Erro ao solicitar redefinição de senha:", error);
    res.status(500).json({ message: "Erro ao solicitar redefinição de senha", error: error.message });
  }
};

exports.verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Garantir que o email e o código foram fornecidos
    if (!email || !code) {
      console.log("E-mail e código são obrigatórios.");
      return res.status(400).json({ message: "E-mail e código são obrigatórios." });
    }

    // Buscar cliente pelo email e código de redefinição
    const client = await Client.findOne({
      email: email.trim().toLowerCase(),
      resetCode: code,
    });

    // Verificar se o cliente existe e se o código está expirado
    if (!client || !client.resetCodeExpires || client.resetCodeExpires < Date.now()) {
      console.log("Código inválido ou expirado.");
      return res.status(400).json({ message: "Código inválido ou expirado." });
    }

    // Verificar se a chave secreta do JWT está definida
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET não está definido no ambiente.");
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    // Gerar token JWT válido por 1 hora
    const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    console.log("Código verificado com sucesso. Token gerado:", token);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Erro ao verificar código de redefinição:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const client = await Client.findById(decoded.id);

    if (!client) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }

    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(password, salt);
    client.resetCode = undefined;
    client.resetCodeExpires = undefined;
    await client.save();

    res.status(200).json({ message: "Senha redefinida com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao redefinir a senha", error: error.message });
  }
};
