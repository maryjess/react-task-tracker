import { useState } from "react"

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false) // the default state

    const onSubmit = (e) => {
        // so that the page's not refreshed
        e.preventDefault()

        if(!text) {
            alert('Please add a task')
            // return. why need return here? actually dunnid right
        }

        onAdd({text, day, reminder}) // proceeds to pass the data to onAdd

        // resets to default state
        setText('')
        setDay('')
        setReminder(false)
    }

    // what's checked for in Set Reminder?
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className= 'form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className= 'form-control'>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className= 'form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
