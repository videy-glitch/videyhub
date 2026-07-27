
// Data Link
let links = JSON.parse(localStorage.getItem("videyLinks")) || [];

// Tombol buka modal
document.getElementById("openModal").onclick = function () {
    document.getElementById("videoModal").style.display = "flex";
};

// Tombol simpan
document.getElementById("saveLink").onclick = function () {

    const video = document.getElementById("videoUrl").value;
    const redirect = document.getElementById("redirectUrl").value;

    if(video==""){
        alert("Masukkan URL Video");
        return;
    }

    links.push({

        id: Date.now(),

        video: video,

        redirect: redirect,

        age: document.getElementById("ageVerify").checked,

        telegram: document.getElementById("telegram").checked

    });

    localStorage.setItem("videyLinks",JSON.stringify(links));

    document.getElementById("videoModal").style.display="none";

    document.getElementById("videoUrl").value="";
    document.getElementById("redirectUrl").value="";

    tampilkanLink();

}

function tampilkanLink(){

    const list=document.getElementById("linkList");

    list.innerHTML="";

    if(links.length==0){

        list.innerHTML="<p>Belum ada link.</p>";

        return;

    }

    links.forEach(function(item){

        list.innerHTML+=`

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

tampilkanLink();
