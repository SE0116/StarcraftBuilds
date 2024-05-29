import React, { useEffect, useState } from 'react';
import { fetchTimelineItems, createTimelineItem, updateTimelineItem, deleteTimelineItem } from '../api';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Timeline: React.FC = () => {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [newItem, setNewItem] = useState({ title: '', description: '', date: '' });

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchTimelineItems();
    setItems(data);
  };

  const handleCreate = async () => {
    await createTimelineItem(newItem);
    setNewItem({ title: '', description: '', date: '' });
    loadItems();
  };

  const handleUpdate = async (id: number) => {
    await updateTimelineItem(id, newItem);
    setNewItem({ title: '', description: '', date: '' });
    loadItems();
  };

  const handleDelete = async (id: number) => {
    await deleteTimelineItem(id);
    loadItems();
  };

  return (
    <div>
      <h1>Timeline</h1>
      <input
        type="text"
        placeholder="Title"
        value={newItem.title}
        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <input
        type="date"
        value={newItem.date}
        onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
      />
      <button onClick={handleCreate}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>{item.date}</p>
            <button onClick={() => handleUpdate(item.id)}>Update</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
