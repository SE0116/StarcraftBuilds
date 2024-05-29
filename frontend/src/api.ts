const API_URL = 'http://localhost:5000';

export async function fetchTimelineItems() {
  const response = await fetch(`${API_URL}/timeline-items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch timeline items');
  }
  return response.json();
}

export async function createTimelineItem(item: { title: string; description: string; date: string }) {
  const response = await fetch(`${API_URL}/timeline-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
  if (!response.ok) {
    throw new Error('Failed to create timeline item');
  }
  return response.json();
}

export async function updateTimelineItem(id: number, item: { title: string; description: string; date: string }) {
  const response = await fetch(`${API_URL}/timeline-items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  });
  if (!response.ok) {
    throw new Error('Failed to update timeline item');
  }
  return response.json();
}

export async function deleteTimelineItem(id: number) {
  const response = await fetch(`${API_URL}/timeline-items/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error('Failed to delete timeline item');
  }
  return response.json();
}
