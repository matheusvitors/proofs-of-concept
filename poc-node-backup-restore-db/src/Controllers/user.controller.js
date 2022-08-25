const User = require("../models/User")

module.exports = {
	index: async (req, res) => {
		try {
			const users = await User.find({}).populate("category");
			return res.json({users});
		} catch (error) {
			console.log(error);
			return res.json({error});
		}
	},

	get: async (req, res) => {
		const { id } = req.params;

		try {

			const user = await User.findById({_id: id});

			if(!user) {
				return res.status(404).json({ message: "Item não encontrado." });
			}

			return res.json({user});

		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	save: async (req, res) => {

		const { name, category } = req.body;

		try {
			const user = new User({ name, category });
			await user.save();
			return res.status(200).json({
				response: { user }
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	edit: async (req, res) => {

		const { id, name, category } = req.body;

		try {
			const user = await User.findById(id);

			if(!user) {
				return res.status(404).json({ message: "Item não encontrado."});
			}

			user.name = name;
			user.category = category;

			await user.save();
			return res.status(200).json({
				response: { user }
			});

		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	delete: async (req, res) => {

		const { id } = req.params;

		try {
			await User.findOneAndRemove({_id: id});
			return res.status(200).json({
				response: {
					message: "Categoria excluída com sucesso!"
				}
			});
		} catch (err) {
			console.log(error);
			return res.status(500).json({error});
		}
	},
}
