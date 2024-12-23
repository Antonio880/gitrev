import { useEffect } from "react";

const extensionBaseUrl = "http://localhost:3000";

const createIncivilityTab = () => {
  const tabsMenu = document.querySelector("nav.UnderlineNav ul.UnderlineNav-body");
  if (!tabsMenu || document.querySelector("#tab-Incivility")) return;

  const IncivilityTab = document.createElement("li");
  IncivilityTab.className = "d-inline-flex";

  const IncivilityTabLink = document.createElement("a");
  IncivilityTabLink.id = "tab-Incivility";
  IncivilityTabLink.className = "UnderlineNav-item";
  IncivilityTabLink.href = "#";
  IncivilityTabLink.textContent = "Incivility";

  IncivilityTabLink.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".UnderlineNav-item").forEach((tab) => tab.classList.remove("selected"));
    IncivilityTabLink.classList.add("selected");
  });

  IncivilityTab.appendChild(IncivilityTabLink);
  tabsMenu.appendChild(IncivilityTab);
};

const validateToken = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("authToken", async (result) => {
      const token = result.authToken;
      if (!token) {
        resolve(false);
        return;
      }

      try {
        const response = await fetch(`${extensionBaseUrl}/auth/github/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        resolve(data.authenticated);
      } catch (error) {
        console.error("Erro ao validar token:", error);
        resolve(false);
      }
    });
  });
};

function ContentScript() {
  useEffect(() => {
    console.log("ContentScript loaded");
    const init = async () => {
      const isAuthenticated = await validateToken();
      if (!isAuthenticated) return;
      createIncivilityTab();
    };

    init();
  }, []);

  return null;
};

export default ContentScript;
