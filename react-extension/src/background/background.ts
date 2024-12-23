const extensionBaseUrl = "http://localhost:3000/auth/github";

chrome.runtime.onInstalled.addListener(() => {
  authenticateWithGitHub();
});

async function authenticateWithGitHub() {
  const authResponse = await fetch(`${extensionBaseUrl}`);
  const authData = await authResponse.json();

  // Abre a aba para autenticação
  chrome.tabs.create({ url: authData.url }, function (tab) {
    console.log("Aba criada para autenticação:", tab);

    // Escuta a mensagem com o token (enviada pelo script injetado)
    chrome.runtime.onMessage.addListener(function listener(
      message,
      sender,
      sendResponse
    ) {
      if (message.type === "github-auth-token") {
        console.log("Mensagem recebida com token:", message);

        const token = message.token;

        if (token) {
          // Salva o token no chrome.storage
          chrome.storage.local.set({ authToken: token }, () => {
            console.log("Token armazenado com sucesso:", token);
          });
        } else {
          console.error("Token não encontrado na mensagem.");
        }

        sendResponse({ success: true });
        // Remove o listener após processar a mensagem
        chrome.runtime.onMessage.removeListener(listener);
      }
    });
  });
}

// Escuta atualizações nas abas
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tabs) {
  if (
    changeInfo.status === "complete" &&
    tabs.url.includes("auth/github/callback")
  ) {
    // Injeta o código diretamente na aba
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: extractTokenAndSendMessage, // Função a ser injetada
    });
  }else{
    console.log("Callback não detectado")
  }
});

// Função injetada diretamente na página
function extractTokenAndSendMessage() {
  // Extraia o token da página (ajuste o seletor se necessário)
  const tokenElement = document.querySelector("body");
  const token = tokenElement?.textContent?.match(
    /"access_token":"([^"]+)"/
  )?.[1];

  if (token) {
    // Envie o token para a extensão
    chrome.runtime.sendMessage({
      type: "github-auth-token",
      token: token,
    });
  } else {
    console.error("Token não encontrado na página.");
  }
}
