import express from 'express';
import type { Express, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app: Express = express();
const PORT = 8080;

app.use(express.json());
const prisma = new PrismaClient();

app.get('/allTodos', async (req: Request, res: Response) => {
  const allTodos = await prisma.todo.findMany();
  return res.json(allTodos);
});

app.post('/createTodo', async (req: Request, res: Response) => {
  try {
    const {title, isCompleted} = req.body;
    const createTodos = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(createTodos);
  } catch (e) {
    return e;
  }
});

app.listen(PORT, () => console.log('server is running🚀'));

