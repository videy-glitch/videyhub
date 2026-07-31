// =========================
// VideyHub Dashboard v1
// =========================

// Cek login
if(localStorage.getItem("videyhub_login") !== "true"){
    window.location.href = "index.html";
}

// Element
const modal = document.getElementById("modal");
const newLinkBtn = document.getElementById("newLinkBtn");
const saveBtn = document.getElementById("saveBtn");
const logoutBtn = document.getElementById("logoutBtn");
const container = document.getElementById("linkContainer");
const totalLinks = document.getElementById("totalLinks");
const totalViews = document.getElementById("totalViews");

// Load data
let links = JSON.parse(localStorage.getItem("videyhub_links")) || [];
const PLAYER_URL = "https://videyhub-api.videyhub.workers.dev";
// =========================
// Modal
// =========================

newLinkBtn.onclick = () => {
    modal.style.display = "flex";
}

window.onclick = (e)=>{
    if(e.target === modal){
        modal.style.display = "none";
    }
}

// =========================
// Logout
// =========================

logoutBtn.onclick = ()=>{

    if(confirm("Logout sekarang?")){

        localStorage.removeItem("videyhub_login");

        window.location.href="index.html";

    }

}

// =========================
// Generate ID
// =========================

function generateID(){

    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result="";

    for(let i=0;i<6;i++){

        result += chars.charAt(Math.floor(Math.random()*chars.length));

    }

    return result;

}

// =========================
// Simpan
// =========================

saveBtn.onclick = ()=>{

    const videoUrl = document.getElementById("videoUrl").value.trim();

    const yesRedirect = document.getElementById("yesRedirect").value.trim();

    const noRedirect = document.getElementById("noRedirect").value.trim();

    if(videoUrl==""){

        alert("URL Video wajib diisi");

        return;

    }

    const data = {

    id: generateID(),

    videoUrl,

    yesRedirect,

    noRedirect,

    showBanner: document.getElementById("showBanner").checked,

    showTelegram: document.getElementById("showTelegram").checked,

    views: 0,

    createdAt: Date.now()

};
    links.unshift(data);

    localStorage.setItem("videyhub_links",JSON.stringify(links));

    modal.style.display="none";

    document.getElementById("videoUrl").value="";
    document.getElementById("yesRedirect").value="";
    document.getElementById("noRedirect").value="";

    render();

}

// =========================
// Render
// =========================

function render(){

    totalLinks.innerText = links.length;

    let total = 0;

    links.forEach(item=>{
        total += item.views;
    });

    totalViews.innerText = total;

    if(links.length===0){

        container.innerHTML=`
        <div class="empty">
            Belum ada link.
        </div>
        `;

        return;

    }

    container.innerHTML="";

    links.forEach(item=>{

        container.innerHTML += `

        <div class="card">

            <div style="display:flex;justify-content:space-between;align-items:center;">

                <div>

                    <h3>${item.id}.mp4</h3>

                    <p>👁 ${item.views}</p>

                </div>

            </div>

            <div class="action">

                <button
                    class="copy-btn"
                    onclick="copyLink('${item.id}')">

                    📋 Copy

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteLink('${item.id}')">

                    🗑 Hapus

                </button>

            </div>

        </div>

        `;

    });

}

// =========================
// Copy
// =========================

function copyLink(id){

    const url = PLAYER_URL + "/" + id + ".mp4";

    navigator.clipboard.writeText(url);

    alert("✅ Link berhasil disalin\n\n" + url);

}

// =========================

render();

function deleteLink(id){

    if(!confirm("Yakin ingin menghapus link ini?")) return;

    links = links.filter(item => item.id !== id);

    localStorage.setItem("videyhub_links", JSON.stringify(links));

    render();

}
