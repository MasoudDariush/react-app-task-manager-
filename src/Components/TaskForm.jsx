import React,{useState,useEffect} from 'react'

export default function TaskForm({onAdd,editTask,onUpdate}) {

    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("");

    useEffect(()=>{
        if(editTask){
            setTitle(editTask.title);
            setDesc(editTask.desc);
        }else{
            setTitle("");
            setDesc("");
        }
    },[editTask]);
    
    const handleSubmit = (e)=> {
            e.preventDefault();

            if (title.trim() === "" || desc.trim() === ""){
                alert("please fill the fields correctly")
            }else{
                    if(editTask) {
                        const updatedTask = {
                            ...editTask,
                            title : title,
                            desc : desc
                        }
                        onUpdate (editTask.id,updatedTask);
                    } else{
                    const newTask = {
                    title : title,
                    desc : desc,
                    completed : false,
                    }

                    onAdd(newTask)
                }

                
            }
            setTitle("");
            setDesc("");
            }

  return (
    <form 
  className="bg-white p-6 rounded-lg shadow-md space-y-4" 
  onSubmit={handleSubmit}
>
  <input
    type="text"
    placeholder="Title of Task"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <textarea
    placeholder="Description of Task"
    value={desc}
    onChange={(e) => setDesc(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
  />

  <button
    type="submit"
    className={`w-full py-2 rounded-lg font-semibold transition-colors duration-200 
      ${editTask 
        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
        : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
  >
    {editTask ? "Update Task" : "Add Task"}
  </button>
</form>

  )
}
