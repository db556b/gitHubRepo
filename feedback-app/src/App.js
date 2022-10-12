import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import FeedbackList from './Components/FeedbackList';
import FeedbackData from './data/FeedbackData';
import FeedbackStats from './Components/FeedbackStats';
import FeedbackForm from './Components/FeedbackForm';


function App() {
  const [feedback, setFeedback] = useState(FeedbackData)

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete this?')){
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    console.log(newFeedback)
  }

  return (
    <>
      <Header text="Feedback.UI"/>
      <FeedbackForm handleAdd={addFeedback} />
      <FeedbackStats feedback={feedback} />
      <FeedbackList feedback={feedback} handleDelete={deleteFeedback} />
    </>
  )
}

export default App;
