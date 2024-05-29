"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const ormconfig_1 = require("./ormconfig");
const TimelineItem_1 = require("./entity/TimelineItem");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
ormconfig_1.AppDataSource.initialize().then(() => {
    const timelineItemRepository = ormconfig_1.AppDataSource.getRepository(TimelineItem_1.TimelineItem);
    app.get('/timeline-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const items = yield timelineItemRepository.find();
        res.json(items);
    }));
    app.post('/timeline-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const newItem = timelineItemRepository.create(req.body);
        const result = yield timelineItemRepository.save(newItem);
        res.json(result);
    }));
    app.put('/timeline-items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        let item = yield timelineItemRepository.findOneBy({ id });
        if (item) {
            timelineItemRepository.merge(item, req.body);
            const result = yield timelineItemRepository.save(item);
            res.json(result);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }));
    app.delete('/timeline-items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const id = parseInt(req.params.id, 10);
        const result = yield timelineItemRepository.delete(id);
        if (result.affected) {
            res.json({ message: 'Item deleted' });
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }));
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => console.log(error));
