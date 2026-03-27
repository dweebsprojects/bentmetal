export default {
  async fetch(request, env) {

    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      
      if (response.status !== 404) {
        return response;
      }

      const url = new URL(request.url);
      if (!url.pathname.endsWith('/') && !url.pathname.includes('.')) {
        const directoryUrl = new URL(url.pathname + '/', url.origin);
        return env.ASSETS.fetch(new Request(directoryUrl, request));
      }
    }

    return new Response("File Not Found in Assets", { status: 404 });
  }
};