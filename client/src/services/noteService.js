const baseURL = 'http://localhost:3001';

export const getAllNotes = async () => {
  try {
    const response = await fetch(`${baseURL}/notes`);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (title, content) => {
  try {
    const response = await fetch(`${baseURL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${baseURL}/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, title, content) => {
  try {
    const response = await fetch(`${baseURL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
