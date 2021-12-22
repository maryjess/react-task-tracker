import { useState, useEffect } from 'react'; //kenapa mesti ada kurung keritingnya?
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer'
import About from './components/About'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  // useEffect takes in a lambda function and an empty list for dependency
  useEffect(() => {
    const setTaskFromServer = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    setTaskFromServer()
  }, [])
  // This empty array above is for dependency, e.g. if there's a user

  // Fetch Tasks
  const fetchTasks = async () => {
    const result = await fetch('http://localhost:5000/tasks')
    const data = await result.json()

    return data
  }

  // Fetch One Task based on the ID
  const fetchTask = async (id) => {
    const result = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await result.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000 + 1)
    // const newTask = {id, ...task}
    // console.log(newTask);
    // setTasks([...tasks, newTask])

    const result = await fetch('http://localhost:5000/tasks',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    }
    )
    
    const data = await result.json()
    setTasks([...tasks, data])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}
    const result = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    }
    )
    const data = await result.json()

    setTasks(tasks.map((tasks) => tasks.id === id ? {...tasks, reminder: data.reminder} : tasks))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAddTask={showAddTask}/>
        <Routes>
        <Route path='/' element={
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? <Tasks tasks = {tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks To Show' }
            </>
        } />
        <Route path='/about' element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
