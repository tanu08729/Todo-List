import React, { useState,useEffect } from 'react'
import "./style.css"
// get the local storage data 
const getLocalData=()=> {
    const list = localStorage.getItem("mytodolist");
    if(list){
        return JSON.parse(list)
        // parse is used to string to array 
    }
    else{
        return [] ;
    }
}
const Todo = () => {
    // state variable 
    const[inputdata,setinputData] = useState("");
    const[items,setItems] = useState(getLocalData());
    const[isEditItem, setIsEditItem] = useState("");
    // toggle Button is used toggle to sign Button either we  need + or edited
    const[toggleButton,setToggleButton] = useState(false);



    //  Add items section 
    const addItem = ()=>{
        if(!inputdata){
            alert("please fill the data")
        }
        // else if condition is used to update the data 
        else if(inputdata && toggleButton){
            setItems(
                items.map((curElem)=>{
                  if(curElem.id===isEditItem){
                    return {...curElem, name:inputdata}
                  }
                  return curElem;
                })
            );
            setinputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
       
        else{
            const mynewInputData = {
                id:new Date().getTime().toString(),
                name:inputdata, 
            }
            setItems([...items, mynewInputData]);
            setinputData("");
        }
    };
    // edit the items 
    const editItem = (index) =>{
const item_todo_edited = items.find((curElem)=>{
    return curElem.id === index;
});

setinputData(item_todo_edited.name);
setIsEditItem(index)
setToggleButton(true)
    };
//  how to delete item section 
const deleteItem =  (index) =>{
    const updatedItems = items.filter((curElem) =>{
        return curElem.id !== index;
    });
    setItems(updatedItems);
    
}
// how to remove all the elements //
const removeAll = () =>{
    setItems([]);
}
// adding local storage using use Effect hook 
// local storage work in the form of key value pair 
// it conatain only string value 
// stringlfy is used  to convert array into string 
useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items)) 
 },[items]);

  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src = "./images/todo.png" alt ="todo logo "/>
                <figcaption> Add your List here </figcaption>
                </figure>
                <div className="addItems">
                    <input type = "text" 
                    placeholder = "✍️ Add Item "
                    className = "form-control" 
                    value={ inputdata}
                    onChange={(event)=>setinputData(event.target.value)}
                    />
                    { toggleButton ? ( <i class="fa fa-edit add-btn" onClick={addItem}></i>)
                    :  (
                    <i class="fa fa-plus add-btn" onClick={addItem}></i>
                    )
                    }
                   
                </div>
                {/* show our items */}
                <div className="showItems">
                    {
                        items.map((curElem)=>{
                            return(
                                <div className="eachItem" key = {curElem.id}>
                        <h3>{curElem.name}</h3>
                        <div className="todo-btn">
                         <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                         <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                    </div>
                    </div>
                            );
                        })
                    }
                    
                    
                </div>
                {/* remove all buttons  */}
                <div className="showItems">
                    <button className = "btn effect04" data-sm-link-text = "Remove ALL" 
                    onClick={removeAll}>
                        <span> CHECK LIST</span>
                    </button>
                </div>
        </div>
    </div>
    </>
  );
};

export default Todo
