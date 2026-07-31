export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    // =========================
    // CORS
    // =========================

    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: cors
      });
    }

    // =========================
    // HOME
    // =========================

    if (path === "/") {
      return new Response("VideyHub API Berjalan 🚀", {
        headers: cors
      });
    }

    // =========================
    // SAVE DATA
    // POST /api/save
    // =========================

    if (path === "/api/save" && request.method === "POST") {

      try {

        const body = await request.json();

        if (!body.id || !body.videoUrl) {

          return Response.json({
            success: false,
            message: "Data tidak lengkap"
          }, {
            headers: cors
          });

        }

        await env.DB.put(
          body.id,
          JSON.stringify(body)
        );

        return Response.json({
          success: true,
          id: body.id
        }, {
          headers: cors
        });

      } catch (err) {

        return Response.json({
          success: false,
          error: err.message
        }, {
          headers: cors
        });

      }

    }

    // =========================
    // GET DATA
    // GET /api/video?id=xxxx
    // =========================

    if (path === "/api/video") {

      const id = url.searchParams.get("id");

      if (!id) {

        return Response.json({
          success:false,
          message:"ID kosong"
        },{
          headers:cors
        });

      }

      const data = await env.DB.get(id);

      if (!data) {

        return Response.json({
          success:false,
          message:"Video tidak ditemukan"
        },{
          headers:cors
        });

      }

      return new Response(data,{
        headers:{
          ...cors,
          "Content-Type":"application/json"
        }
      });

    }

    // =========================
    // NEXT PART
    // =========================

    return new Response("404",{
      status:404,
      headers:cors
    });

  }
}
