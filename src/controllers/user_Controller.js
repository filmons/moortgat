const { pick } = require("lodash");
Model = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secret = process.env.JWT_SECRET;
require("dotenv").config();

const { NotFoundError, BadRequestError } = require("../helpers/errors");



const userController = {
	findAllUsers: async () => {
		const users = await Model.Users.findAll({
			order: [["name", "ASC"]],
			attributes: { exclude: ["createdAt", "updatedAt"] },
			raw: true,
		});
		return users;
	},
	getOne: async (id) => {
		const apprenant = await Model.Users.findOne({
		  where: {
			id
		  },
		  attributes: {exclude: ["createdAt", "updatedAt", "ProcesId", "proces_id"]},
		  include: 'proces'
		});
		if (!apprenant) {
		  throw new NotFoundError("Ressource introuvable", "Ce Apprenant n'existe pas");
		}
	
		return apprenant;
	  },

	registre: async (data) => {
		console.log(data);
		const { email, password, name, adresse, lastname } = data;
		if (!email || !password || !name || !adresse || !lastname) {
			throw new BadRequestError(" veuillez remplir les champs");
		}

		const utilisateurEmail = await Model.Users.findOne({
			where: {
				email,
			},
		});

		if (utilisateurEmail) {
			throw new BadRequestError(
				"Un compte existe déjà avec cette adresse email. cliquer sur se connecter."
			);
		}

		const salt = parseInt(process.env.SALT_ROUNDS);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await Model.Users.create({
			...data,
			password: hashedPassword,
		});
		return newUser;
	},

	login: async (data) => {
		console.log(data);
		const { email, password } = data;
		const user = await Model.Users.findOne({
		  where: {
			email,
		  },
		});
		if (!user) {
		  throw new BadRequestError("Cet utilisateur n'existe pas");
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
		  throw new BadRequestError("Mot de passe incorrect");
		}
	
		const { id } = user;
		const token = jwt.sign({ id }, secret, { expiresIn: "24h" });
		return { token };
		// return { token ,user}; pour voirt tout le information de user
	  },
	
};

module.exports = userController;
