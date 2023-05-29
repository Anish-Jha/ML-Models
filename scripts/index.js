const loginForm = document.getElementById("login");
const registerForm = document.getElementById("register");
const verifystyle = document.getElementById("verify");
const loading = document.getElementById("loading");
const loading2 = document.getElementById("loading2");
loading.style.display = "none";
loading2.style.display = "none";
const otp = Math.floor(Math.random() * 100000);
verifystyle.style.display = "none";
loginForm.style.display = "none";
const showLogin = document
  .getElementById("showLogin")
  .addEventListener("click", function () {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    verifystyle.style.display = "none";
  });
const showRegister = document
  .getElementById("showRegister")
  .addEventListener("click", function () {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    verifystyle.style.display = "none";
  });

document.querySelector("#register").addEventListener("submit", submit);
function submit(e) {
  e.preventDefault();
  const data = {
    name: register.name.value,
    email: register.email.value,
    password: register.password.value,
    rePass: register.rePass.value,
  };
  if (
    data.name !== "" &&
    data.email !== "" &&
    data.password !== "" &&
    data.rePass !== ""
  ) {
    if (data.password == data.rePass) {
      const emailbody = `
      <h1>This is your one-time password.</h1><br>
       <h2>Your OTP is ${otp}</h2>`;

      Email.send({
        SecureToken: "90e83a7f-f8ef-4032-8a52-62a661bd9af1",
        To: data.email,
        From: "piyushpratapsingh8@gmail.com",
        Subject: "OTP",
        Body: emailbody,
      }).then((message) => {
        if (message === "OK") {
          verifystyle.style.display = "block";
          registerForm.style.display = "none";
          alert("OTP has been sent to your email " + data.email);
        } else {
          alert(message);
        }
      });

      document.querySelector("#verify").addEventListener("submit", verify);
      function verify(e) {
        e.preventDefault();
        const otp_val = document.getElementById("otp");
        if (otp_val.value == otp) {
          loading.style.display = "block";
          fetch("https://ml-backend-85ad.onrender.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              localStorage.setItem("user", JSON.stringify(data));
              loading.style.display = "none";
              alert("User added successfully");
              window.location.href = "dashboard.html";
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          alert("Invalid OTP");
        }
      }
    } else {
      alert("Password not the same");
    }
  } else {
    alert("All fields are required!");
  }
}

document.querySelector("#login").addEventListener("submit", login);
function login(el) {
  el.preventDefault();
  verifystyle.style.display = "none";
  
  const email = loginForm.email.value;
  const password = loginForm.password.value;
  if(email=="admin@gmail.com" && password=="Admin"){
    window.location.href='admin.html'
  }else if(email!=="" && password!==""){
    loading2.style.display = "block";
    fetch("https://ml-backend-85ad.onrender.com/users")
    .then((response) => {
      
      return response.json();
    })
    .then((userdata) => {
      const user = userdata.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        alert("Login successfull");
        loading2.style.display = "none";
        window.location.href = "dashboard.html";
      } else {
        alert("Login failed");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }else{
    alert("All fields are necessary")
  }
}
