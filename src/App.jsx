import { useState } from "react";
function App() {

  // Görevleri ve input değerini saklamak için state
  const [tasks, setTasks ] = useState ([]);
  const [input, setInput ] = useState ("");
  const [editId, setEditId ] = useState (null);

  // Görev ekleme veya güncelleme fonksiyonu
  const handleSubmit = () => {
    if (input === "") return;

    if (editId) {

      // Güncelleme
      setTasks (tasks.map(task => task.id === editId ? {...task, text: input} : task));
      setEditId (null);
    } else {

      // Yeni ekleme
      setTasks([...tasks, { id: Date.now(), text: input }]);
    }
    setInput("");
  };

     // Görev Silme
     const deleteTask = (id) => {
      setTasks(tasks.filter(task => task.id !== id));
     };

     // Güncelleme Başlat
     const editTask = (task) => {
      setInput(task.text);
      setEditId(task.id);
     };

     return(
      <div style={{
        padding:"40px", 
        maxWidth:"400px", 
        margin:"50px auto",
        fontFamily:"Arial",
        background:"#f9f9f9",
        borderRadius: "10px",
        boxShadow:"0 0 10px rgba(0,0,0,0.1)"
        }}>
        <h1 style={{textAlign:"center", marginBottom:"20px", color:"#333"}}>
          Study Task Manager
          </h1>

        <div style={{display:"flex", marginBottom:"20px"}}>
          <input
          value={input}
          onChange={(e)=>setInput(e.target.value)}
          placeholder="Yeni görev yaz"
          style={{
            flex:1, 
            padding:"8px",
            border:"1px solid #ccc",
            borderRadius:"5px"
          }}
          />
          <button onClick={handleSubmit} style={{
            padding:"8px", 
            marginLeft:"5px",
            background:"#4CAF50",
            color:"white",
            border:"none",
            borderRadius:"5px",
            cursor:"pointer"
            }}>
            {editId ? "Güncelle" : "Ekle"}
          </button>
        </div>

        <ul style={{listStyle: "none", padding:0}}>
          {tasks.map(task => (
            <li key={task.id} style={{display:"flex", justifyContent:"space-between", border:"1px solid #ccc", padding:"8px", marginBottom:"5px"}}>
              {task.text}
              <div>
                <button onClick={()=>editTask(task)} style={{marginRight:"5px"}}>Düzenle</button>
                <button onClick={()=>deleteTask(task.id)} style={{color:"red"}}>Sil</button>
              </div>
              </li>
          ))}
        </ul>

      </div>
     );
    
}

export default App;