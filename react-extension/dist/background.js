(()=>{function e(){const e=document.querySelector("body"),o=e?.textContent?.match(/"access_token":"([^"]+)"/)?.[1];o?chrome.runtime.sendMessage({type:"github-auth-token",token:o}):console.error("Token não encontrado na página.")}chrome.runtime.onInstalled.addListener((()=>{!async function(){const e=await fetch("http://localhost:3000/auth/github"),o=await e.json();chrome.tabs.create({url:o.url},(function(e){console.log("Aba criada para autenticação:",e),chrome.runtime.onMessage.addListener((function e(o,t,n){if("github-auth-token"===o.type){console.log("Mensagem recebida com token:",o);const t=o.token;t?chrome.storage.local.set({authToken:t},(()=>{console.log("Token armazenado com sucesso:",t)})):console.error("Token não encontrado na mensagem."),n({success:!0}),chrome.runtime.onMessage.removeListener(e)}}))}))}()})),chrome.tabs.onUpdated.addListener((function(o,t,n){"complete"===t.status&&n.url.includes("auth/github/callback")?chrome.scripting.executeScript({target:{tabId:o},func:e}):console.log("Callback não detectado")}))})();