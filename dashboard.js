// =========================
// VideyHub Dashboard v1
// =========================

const modal = document.getElementById("modal");

const newLinkBtn = document.getElementById("newLinkBtn");

const saveBtn = document.getElementById("saveBtn");

const container = document.getElementById("linkContainer");


// buka modal

newLinkBtn.onclick = () => {

    modal.style.display = "flex";

};


// klik luar modal

window.onclick = (e)=>{

    if(e.target==modal){

        modal.style.display="none";

    }

};


// generate id random

function generateID(){

    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id="";

    for(let i=0;i<6;i++){

        id+=chars.charAt(Math.floor(Math.random()*chars.length));

    }

    return id;

}


// load data

let links = JSON.parse(localStorage.getItem("videyhub_links")) || [];

render();


// simpan

saveBtn.onclick = ()=>{

    const videoUrl=document.getElementById("videoUrl").value.trim();

    const yesRedirect=document.getElementById("yesRedirect").value.trim();

    const noRedirect=document.getElementById("noRedirect").value.trim();

    if(videoUrl===""){

        alert("URL Video wajib diisi");

        return;

    }

    const data={

        id:generateID(),

        videoUrl,

        yesRedirect,

        noRedirect,

        showBanner:document.getElementById("showBanner").checked,

        showTelegram:document.getElementById("showTelegram").checked,

        views:0

    };

    links.unshift(data);

    localStorage.setItem("videyhub_links",JSON.stringify(links));

    modal.style.display="none";

    document.getElementById("videoUrl").value="";

    document.getElementById("yesRedirect").value="";

    document.getElementById("noRedirect").value="";

    render();

};


// tampilkan card

function render(){

    if(links.length==0){

        container.innerHTML=`

        <div class="empty">

            Belum ada Link.

        </div>

        `;

        return;

    }

    container.innerHTML="";

    links.forEach(item=>{

        container.innerHTML+=`

        <div class="card">

            <h3>👁 ${item.views}</h3>

            <p>${item.id}.mp4</p>

            <div class="action">

                <button class="copy-btn"

                onclick="copyLink('${item.id}')">

                📋 Copy

                </button>

            </div>

        </div>

        `;

    });

}


// copy

function copyLink(id){

    const url=location.origin+"/"+id+".mp4";

    navigator.clipboard.writeText(url);

    alert("Link berhasil disalin");

}
