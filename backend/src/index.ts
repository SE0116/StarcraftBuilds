import express from 'express';
import 'reflect-metadata';
import cors from 'cors';
import { AppDataSource } from './ormconfig';
import { TimelineItem } from './entity/TimelineItem';

const app = express();
const port = process.env.PORT || 5000;

// CORS 미들웨어 설정 - 특정 출처 허용
app.use(cors());

app.use(express.json());

AppDataSource.initialize().then(() => {
  const timelineItemRepository = AppDataSource.getRepository(TimelineItem);

  app.get('/', (req, res) => {
    res.send('Server is running!');
  });

  app.get('/timeline-items', async (req, res) => {
    const items = await timelineItemRepository.find();
    res.json(items);
  });

  app.post('/timeline-items', async (req, res) => {
    const newItem = timelineItemRepository.create(req.body);
    const result = await timelineItemRepository.save(newItem);
    res.json(result);
  });

  app.put('/timeline-items/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    let item = await timelineItemRepository.findOneBy({ id });
    if (item) {
      timelineItemRepository.merge(item, req.body);
      const result = await timelineItemRepository.save(item);
      res.json(result);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });

  app.delete('/timeline-items/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const result = await timelineItemRepository.delete(id);
    if (result.affected) {
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => console.log(error));
