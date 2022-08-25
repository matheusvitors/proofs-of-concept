const Category = require("../models/Category")

module.exports = {
	index: async (req, res) => {
		try {
			const categories = await Category.find({});
			return res.json({categories});
		} catch (error) {
			console.log(error);
			return res.json({error});
		}
	},

	get: async (req, res) => {
		const { id } = req.params;

		try {

			const category = await Category.findById({_id: id});

			if(!category) {
				return res.status(404).json({ message: "Item não encontrado." });
			}

			return res.json({category});

		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	save: async (req, res) => {

		const { name } = req.body;

		try {
			const category = new Category({ name });
			await category.save();
			return res.status(200).json({
				response: { category }
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	edit: async (req, res) => {

		const { id, name } = req.body;

		try {
			const category = await Category.findById(id);

			if(!category) {
				return res.status(404).json({ message: "Item não encontrado."});
			}

			category.name = name;

			await category.save();
			return res.status(200).json({
				response: { category }
			});

		} catch (error) {
			console.log(error);
			return res.status(500).json({error});
		}
	},

	delete: async (req, res) => {

		const { id } = req.params;

		try {
			await Category.findOneAndRemove({_id: id});
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
