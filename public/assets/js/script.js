// ON CHURCH — interações iniciais
// Troque pelo número oficial, incluindo código do país e DDD. Exemplo: 5511999999999
const WHATSAPP_NUMBER = "5511999999999";

const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu mobile ao selecionar um link.
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Atualiza automaticamente o ano do rodapé.
document.querySelector("#year").textContent = new Date().getFullYear();

// O formulário abre uma conversa no WhatsApp com a mensagem preenchida.
document.querySelector("#contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const message = document.querySelector("#message").value.trim();

  if (!name || !message) return;

  if (WHATSAPP_NUMBER === "5511999999999") {
    alert("Antes de publicar, configure o número oficial do WhatsApp no arquivo script.js.");
    return;
  }

  const text = `Olá! Meu nome é ${name}. ${message}`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});
