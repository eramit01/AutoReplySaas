(function () {
  const currentScript = document.currentScript;
  const query = new URLSearchParams(currentScript?.src.split("?")[1]);
  const spaId =
    query.get("spa") || currentScript?.dataset?.spa || window.__SPA_BOT_ID;
  const baseUrl =
    currentScript?.dataset?.base ||
    currentScript?.src.split("/bot.js")[0] ||
    window.location.origin;

  if (!spaId) {
    console.warn("[SpaBot] Missing spaId");
    return;
  }

  const iframe = document.createElement("iframe");
  iframe.src = `${baseUrl}?spa=${spaId}`;
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.position = "fixed";
  iframe.style.bottom = "0";
  iframe.style.right = "0";
  iframe.style.zIndex = "999999";
  iframe.style.background = "transparent";
  iframe.allow = "clipboard-write";

  const container = document.createElement("div");
  container.id = "spa-bot-root";
  container.style.position = "fixed";
  container.style.bottom = "0";
  container.style.right = "0";
  container.style.width = "400px";
  container.style.height = "600px";
  container.style.maxWidth = "100vw";
  container.style.maxHeight = "100vh";
  container.style.pointerEvents = "none";

  iframe.style.pointerEvents = "auto";
  container.appendChild(iframe);
  document.body.appendChild(container);
})();

