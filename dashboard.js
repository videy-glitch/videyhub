let links = JSON.parse(localStorage.getItem("videyLinks")) || [];

const modal = document.getElementById("videoModal");
const openBtn = document.getElementById("openModal");
const saveBtn = document.getElementById("saveLink");
const list = document.getElementById("linkList");

openBtn.onclick = function(){

    modal.style.display="flex";

}

saveBtn.onclick = function(){

    const video=document.getElementById("videoUrl").value.trim();

    const redirect=document.getElementById("redirectUrl").value.trim();

    if(video===""){

        alert("Masukkan URL Video!");

        return;

    }

    links.push({

        id:Date.now(),

        video:video,

        redirect:redirect,

        age:document.getElementById("ageVerify").checked,

        telegram:document.getElementById("telegram").checked

    });

    localStorage.setItem("videyLinks",JSON.stringify(links));

    document.getElementById("videoUrl").value="";

    document.getElementById("redirectUrl").value="";

    modal.style.display="none";

    tampilkan();

}

function tampilkan(){

    list.innerHTML="";

    if(links.length===0){

        list.innerHTML="<p>Belum ada link.</p>";

        return;

    }

    links.forEach(function(item){

        list.innerHTML += `
            <div class="card">

                <b>Video</b><br>

                ${item.video}

                <br><br>

                <b>Redirect</b><br>

                ${item.redirect || "-"}

            </div>
        `;

    });

}

tampilkan();
