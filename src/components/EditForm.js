import React, { useState } from 'react';

const EditForm = ({ currentData, setIsEditing, editData }) => {
  const [title, setTitle] = useState(currentData.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    editData({ ...currentData, title });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Update</button>
      <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditForm;
