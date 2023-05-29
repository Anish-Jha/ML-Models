let data = JSON.parse(localStorage.getItem("user")) || [];
let owner = document.getElementById("owner-info");
let dataArr = [];
dataArr.push(data);
console.log(dataArr);
function showInfo() {
  if (owner.style.display === "block") {
    owner.style.display = "none";
  } else {
    owner.style.display = "block";
  }

  owner.innerHTML = "";

  dataArr.forEach(function (el) {
    let name = document.createElement("h3");
    name.innerText = "Name: " + el.name;
    let email = document.createElement("h3");
    email.innerText = "Email: " + el.email;
    owner.append(name, email);
  });
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

let mlContent = document.getElementById("content-cont");
let right_cont=document.getElementById('right-cont');

function showClass() {
  event.preventDefault();
  mlContent.innerHTML =
    "Machine model classification refers to the process of categorizing or labeling data into predefined classes or categories using machine learning models. It is a supervised learning task where the model is trained on a labeled dataset, meaning that each data instance has a known class or category.The goal of machine model classification is to develop a model that can accurately predict the class or category of unseen or future instances based on their features or attributes. The model learns patterns and relationships in the training data and uses that knowledge to make predictions on new, unlabeled data.";
  right_cont.innerHTML="Hi Piyush"
}

function showReg() {
  event.preventDefault();
  mlContent.innerHTML = "Machine model regression refers to the process of predicting continuous or numerical values based on input variables or features using machine learning models. In regression, the goal is to develop a model that can accurately estimate or predict a continuous target variable.Machine model regression is widely used in various domains, including finance, economics, healthcare, engineering, and social sciences, where predicting numerical values is of great importance for decision-making, forecasting, and analysis.";
  right_cont.innerHTML="Hi Anish"
}
