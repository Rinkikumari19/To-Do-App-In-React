import React, { Fragment, useState, useEffect } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const getLocalItems = () => {
    let list = localStorage.getItem('list')
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return [];
    }
}

function ToDoApp() {
    const [item, setItem] = useState("")
    const [list, setList] = useState(getLocalItems());

    useEffect(() => {
       localStorage.setItem('list', JSON.stringify(list))
    }, [list])

    const addItem = () =>{
        if(item.length>0){
            setList([...list, item])
            setItem("")
        }else{
            alert("write something...")
        }
        
    }
    const deleteItem = (id) => {
        const newData = [...list];
        newData.splice(id,1);
        setList(newData)
    }

    const editItem = (id) => {
        setItem(list[id])
       
        // {list.filter(name => !(name.includes(list[id]))).map(toDo => (
        //     console.log(toDo)
        //   ))}
    }

    const clearToDo = () => {
        setList([])
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            addItem();
        }
      }
    return (
        <Fragment>
            <h1>TO DO LIST</h1>
            <input type ='text' className='input-box' onChange={(e)=>setItem(e.target.value)} onKeyPress={handleKeyPress} value={item} placeholder='Add To Do...✍️' />
            <button className='input-box addBtn' onClick={addItem} >Add</button>
           
            <div id='container'>
                {list.map((ele,index)=>{
                        
                return <div className='sub-con' key={ele}>
                            <div className='item'>{ele}</div>
                            <button><EditIcon onClick={()=>editItem(index)}/></button>
                            <button><DeleteIcon onClick={()=>deleteItem(index)}/> </button>
                        </div>
                })}
            </div>   
           
            <div>{list.length>0? <Button variant="contained"  onClick={clearToDo} color="primary">
                 Clear All
                </Button>:("")}
            </div>
        </Fragment>
    )
}


export default ToDoApp