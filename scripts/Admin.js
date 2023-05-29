let dataArr=[];
const getData=async()=>{
    const response =await fetch('https://ml-backend-85ad.onrender.com/users');
    const data=await response.json();
    dataArr=data;
    console.log(data);
    append(data);
}

getData()

function append(data){
    let container=document.getElementById('container');
    container.innerHTML=null;
    data.forEach(function(el,id){
        let div=document.createElement('div');
        div.setAttribute('class','card');
        let name=document.createElement('h3');
        name.innerText=el.name;
        let email=document.createElement('h4');
        email.innerText=el.email;
        let editBtn=document.createElement('button');
        editBtn.innerText="Edit";
        editBtn.style.backgroundColor='green'
        editBtn.addEventListener('click',function(){
            edit(id);
        })
        let delBtn=document.createElement('button');
        delBtn.innerHTML="Delete"
        delBtn.style.backgroundColor='red'
        delBtn.addEventListener('click',function(){
            remove(id);
        })
        div.append(name,email,editBtn,delBtn);
        container.append(div);
    })
}

function edit(id){
let edId=dataArr[id].id;
let newData={...dataArr[edId]};

const newName=window.prompt("Enter new name", newData.name)
if(newName){
    newData.name=newName;
}

const newEmail=window.prompt("Enter new email", newData.email)
if(newEmail){
    newData.email=newEmail;
}

fetch(`https://ml-backend-85ad.onrender.com/users/${edId}`,{
    method:"PATCH",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(newData),
}).then((res)=>{
    return res.json()
}).then((data)=>{
    getData();
}).catch((err)=>{
    console.log(err);
})
}

function remove(id){
    let delId=dataArr[id].id;
    fetch(`https://ml-backend-85ad.onrender.com/users/${delId}`,{
        method:"DELETE"
    }).then((res)=>{
        return res.json();
    }).then(data=>{
        console.log(data);
        getData();
    }).catch((err)=>{
        console.log(err);
    })
}
