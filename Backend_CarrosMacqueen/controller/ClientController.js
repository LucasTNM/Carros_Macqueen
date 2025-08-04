const IClientController = require('./IClientController.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const config = require('../config.js');
const ClientDAO = require('../persistencelayer/dao/'+config.IClientDAO);
let clientdao = new ClientDAO();

class ClientController extends IClientController{
  constructor(){
    super();
       
  }

  
  async show(req, res)
    {
  
       let clients = await clientdao.recovery();
        return res.status(200).json(clients);
    }
  async store(req, res)
     {
        try {
          const client =  await clientdao.create(req);
          return res.status(201).json(client);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
     }
   async destroy(req,res){
         try {
           let client = await clientdao.delete(req);
           if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
           return res.status(200).json({ message: "Cliente deletado com sucesso" });
         } catch (error) {
           return res.status(500).json({ message: 'Erro ao deletar cliente', error: error.message });
         }
    }
   async update(req,res){
        try {
          let client = await clientdao.update(req);
          if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
          return res.json(client);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
        }
    }

   async index(req,res)
    {
        try {
          let clients = await clientdao.search(req);
          return res.json(clients);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar clientes', error: error.message });
        }
    }

   async getByEmail(req,res)
    {
        try {
          let client = await clientdao.findByEmail(req);
          if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
          return res.status(200).json(client);
        } catch (error) {
          return res.status(500).json({ message: 'Erro ao buscar cliente', error: error.message });
        }
    }

    async login(req, res) {
      const { email, password } = req.body;
      try {
        const Client = require('../persistencelayer/models/Client');
        const client = await Client.findOne({ email: email.trim().toLowerCase() });

        if (!client) {
          console.log("Email não encontrado:", email);
          return res.status(401).json({ message: "Email inválido" });
        }

        const isValidPassword = await bcrypt.compare(password, client.password);
        if (!isValidPassword) {
          console.log("Senha inválida para o email:", email);
          return res.status(401).json({ message: "Senha inválida" });
        }

        const token = jwt.sign(
          { id: client._id, email: client.email },
          process.env.JWT_SECRET || "default_secret",
          { expiresIn: "8h" }
        );

        res.status(200).json({
          message: "Login realizado com sucesso",
          token,
          client: {
            id: client._id,
            name: client.name,
            email: client.email,
            CPF: client.CPF,
            clientId: client.clientId,
          },
        });
      } catch (error) {
        console.error("Erro interno no servidor:", error);
        res.status(500).json({ message: "Erro interno do servidor", error: error.message });
      }
    }

    async resetPassword(req, res) {
      const { email } = req.body;
      try {
        const Client = require('../persistencelayer/models/Client');
        const client = await Client.findOne({ email });

        if (!client) {
          return res.status(404).json({ message: "Email não encontrado" });
        }

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);

        client.resetCode = resetCode;
        client.resetCodeExpires = resetCodeExpires;
        await client.save();

        const transporter = nodemailer.createTransporter({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Código de Redefinição de Senha",
          text: `Seu código de redefinição de senha é: ${resetCode}. Este código expira em 15 minutos.`,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Código de redefinição enviado para o email" });
      } catch (error) {
        res.status(500).json({ message: "Erro ao enviar email", error: error.message });
      }
    }

    async verifyResetCode(req, res) {
      const { email, resetCode } = req.body;
      try {
        const Client = require('../persistencelayer/models/Client');
        const client = await Client.findOne({
          email,
          resetCode,
          resetCodeExpires: { $gt: Date.now() },
        });

        if (!client) {
          return res.status(400).json({ message: "Código inválido ou expirado" });
        }

        res.status(200).json({ message: "Código válido" });
      } catch (error) {
        res.status(500).json({ message: "Erro ao verificar código", error: error.message });
      }
    }

    async updatePassword(req, res) {
      const { email, resetCode, newPassword } = req.body;
      try {
        const Client = require('../persistencelayer/models/Client');
        const client = await Client.findOne({
          email,
          resetCode,
          resetCodeExpires: { $gt: Date.now() },
        });

        if (!client) {
          return res.status(400).json({ message: "Código inválido ou expirado" });
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!passwordRegex.test(newPassword)) {
          return res.status(400).json({
            message: "A senha deve ter no mínimo 8 dígitos, um caractere especial e uma letra maiúscula",
          });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        client.password = hashedPassword;
        client.resetCode = undefined;
        client.resetCodeExpires = undefined;
        await client.save();

        res.status(200).json({ message: "Senha redefinida com sucesso" });
      } catch (error) {
        res.status(500).json({ message: "Erro ao redefinir senha", error: error.message });
      }
    }
  
}
module.exports = ClientController;
