import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import {useState} from 'react'

function FeedbackForm( {handleAdd}) {
    const [text, setText] = useState(''),
          [btnDisabled, setBtnDisabled] = useState(true),
          [message, setMessage] = useState(''),
          [rating, setRating] = useState(10)

    const handleTextChange = (e) => {
        if (text === ''){
            setBtnDisabled(true);
            setMessage(null);
        } else if (text !== '' && text.trim().length <= 10){
            setBtnDisabled(true);
            setMessage('Text must be at least 10 characters');
        } else {
            setMessage(null);
            setBtnDisabled(false);
        }
        setText(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (text.trim().length > 10){
            const newFeedFeedback = {
                text,
                rating,
            }
            console.log(handleAdd)
            setText('')
        }
    }

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would  you rate your service with us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input 
                 onChange={handleTextChange}
                 type="text" 
                 placeholder="Write a review" 
                 value={text} />
                <Button type="submit" isDisabled={btnDisabled}>
                    Send
                </Button>
            </div>
            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm