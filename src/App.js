import {React , useState} from 'react'
import TodoForm from './components/TodoForm';
import Todo from './components/Todo';
import "./App.css";

const App = () => {
  let [todos , setTodos] = useState([]);
  const[todoToShow , setTodoToShow] = useState("all");
  const[toggleAllComplete , setToggleAllComplete] = useState(true);
  
  const addTodo = (todo)=>{
    setTodos([todo, ...todos]);
  };
  const handleDelete = (id)=>{
    setTodos(todos.filter((todo)=>todo.id !== id))
  };
  const updateTodoToShow = (s)=>{
    setTodoToShow(s);
  };
  const removeAllTodosThatAreComplete = () =>{
    setTodos(todos.filter((todo)=> !todo.complete));
  };
  const toggleComplete = (id)=>{setTodos(
    todos.map((todo)=>{
      if(todo.id === id){
     return{
      ...todo ,
      complete : !todo.complete
     }
      }else{
        return todo ;
      }
    })
  )};
  if(todoToShow === "active"){
    todos = todos.filter((todo)=> !todo.complete);
  }else if (todoToShow === "complete"){
    todos = todos.filter((todo)=> todo.complete);
  }
  return (
    <div className='container'>
      <TodoForm onSubmit = {addTodo}/>
      {
        todos.map((todo)=>(
          <Todo key={todo.id} todo={todo} onDelete={()=> handleDelete(todo.id)} toggleComplete={()=> toggleComplete(todo.id)}/>
        ))
      }
      <div>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("All")}>All</button>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("Active")}>Active</button>
        <button className='update-btn btn' onClick={()=> updateTodoToShow("Complete")}>Complete</button>

      </div>
      <button className='all-btn btn' onClick={removeAllTodosThatAreComplete}>
        Remove all complete</button>
      <button className='all-btn btn' onClick={()=>{
        setTodos(
          todos.map((todo)=>({
            ...todo,
            complete : toggleAllComplete,
          }))
        );
        setToggleAllComplete(!toggleAllComplete);
      }}>
        Toggle all complete : true </button>

    </div>
  );
};

export default App ;

