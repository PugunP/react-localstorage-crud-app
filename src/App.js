import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import { format } from 'date-fns';
import './App.css';

const App = () => {
  const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState({ id: null, title: '', creationTime: '' });

  // useEffect(() => {
  //   // Load data from LocalStorage when the component mounts
  //   const storedData = localStorage.getItem('data');
  //   if (storedData) {
  //     setData(JSON.parse(storedData));
  //   }
  // }, []);

  useEffect(() => {
    // Save data to LocalStorage whenever data changes
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const addData = (title) => {
    const newData = {
      id: data.length + 1,
      title,
      creationTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
    setData([...data, newData]);
  };

  const deleteData = (id) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
  };

  const editData = (updatedData) => {
    const updatedItems = data.map(item => (item.id === updatedData.id ? updatedData : item));
    setData(updatedItems);
    setIsEditing(false);
  };

  const startEdit = (item) => {
    setIsEditing(true);
    setCurrentData({ id: item.id, title: item.title, creationTime: item.creationTime });
  };

  return (
    <div className="container">
      <h1>React CRUD with LocalStorage</h1>
      {isEditing ? (
        <EditForm currentData={currentData} setIsEditing={setIsEditing} editData={editData} />
      ) : (
        <AddForm addData={addData} />
      )}
      <DataTable data={data} deleteData={deleteData} startEdit={startEdit} />
    </div>
  );
};

export default App;
