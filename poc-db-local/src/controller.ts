import { Request, Response, Router } from "express";
import { prisma } from "./prisma";


const router = Router();

router.get('/tasks', async (req: Request, res: Response) => {
	try {
		const tasks = await prisma.task.findMany();
		return res.json({ tasks });
	} catch (error: any) {
		console.log(error);
		res.status(500).send({ error: error.message })
	}
})

router.post('/tasks', async (req: Request, res: Response) => {

	const { description } = req.body;

	try {
		await prisma.task.create({data: {description}});
		return res.status(200).end();
	} catch (error: any) {
		console.log(error);
		res.status(500).send({ error: error.message })
	}
})

router.put('/tasks/:id', async (req: Request, res: Response) => {

	const { id } = req.params;
	const { description } = req.body;

	try {
		await prisma.task.update({where: { id: Number(id) },  data: { description }});
		return res.status(200).end();
	} catch (error: any) {
		console.log(error);
		res.status(500).send({ error: error.message })
	}
})

router.delete('/tasks/:id', async (req: Request, res: Response) => {

	const { id } = req.params;

	try {
		await prisma.task.delete({ where: { id: Number(id) } });
		return res.status(200).end();
	} catch (error: any) {
		console.log(error);
		res.status(500).send({ error: error.message })
	}
})

export { router }
