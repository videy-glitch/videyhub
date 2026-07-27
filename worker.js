export default {
  async fetch(request) {

    const url = new URL(request.url);

    // Buka dashboard
    if (url.pathname === "/" || url.pathname === "/dashboard") {
      return Response.redirect(url.origin + "/dashboard.html", 302);
    }

    // Kalau buka .mp4
    if (url.pathname.endsWith(".mp4")) {

      const id = url.pathname.replace("/", "").replace(".mp4", "");

      return new Response(`
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${id}</title>

<style>

body{
margin:0;
background:#111;
font-family:Arial;
color:white;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
}

.box{

width:90%;
max-width:420px;

background:#1f1f1f;

padding:25px;

border-radius:12px;

text-align:center;

}

button{

width:100%;

padding:14px;

margin-top:10px;

font-size:17px;

border:none;

border-radius:8px;

cursor:pointer;

}

.yes{

background:#00b894;

color:white;

}

.no{

background:#e74c3c;

color:white;

}

</style>

</head>

<body>

<div class="box">

<h2>🔞 Verifikasi Umur</h2>

<p>Apakah umur Anda sudah 18 tahun ke atas?</p>

<button class="yes" onclick="alert('Nanti redirect YES')">

YA

</button>

<button class="no" onclick="alert('Nanti redirect NO')">

TIDAK

</button>

</div>

</body>

</html>

`, {
        headers: {
          "content-type": "text/html;charset=UTF-8"
        }
      });

    }

    return fetch(request);

  }
}
