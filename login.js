const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

document.addEventListener("keydown", function(e){
    if(e.key==="Enter"){
        login();
    }
});

function login(){

    const username=document.getElementById("username").value.trim();

    const password=document.getElementById("password").value.trim();

    if(username==="senpai" && password==="sukajadi1"){

        localStorage.setItem("videyhub_login","true");

        window.location.href="dashboard.html";

    }else{

        document.getElementById("error").textContent="Username atau Password salah.";

    }

}
