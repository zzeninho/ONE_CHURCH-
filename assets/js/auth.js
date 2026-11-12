const loginTab = document.querySelector("#loginTab");
const registerTab = document.querySelector("#registerTab");
const loginForm = document.querySelector("#loginForm");
const registerForm = document.querySelector("#registerForm");

function showForm(which) {
  const isLogin = which === "login";
  loginForm.classList.toggle("hidden", !isLogin);
  registerForm.classList.toggle("hidden", isLogin);
  loginTab.classList.toggle("active", isLogin);
  registerTab.classList.toggle("active", !isLogin);
  loginTab.setAttribute("aria-selected", String(isLogin));
  registerTab.setAttribute("aria-selected", String(!isLogin));
}

loginTab.addEventListener("click", () => showForm("login"));
registerTab.addEventListener("click", () => showForm("register"));
document.querySelectorAll("[data-switch]").forEach(button => {
  button.addEventListener("click", () => showForm(button.dataset.switch));
});
document.querySelector("#year").textContent = new Date().getFullYear();

// Demonstração visual: sem servidor, banco de dados ou autenticação real.
loginForm.addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#loginFeedback").textContent = "Layout pronto! Para validar o login de verdade, conecte um backend ou serviço de autenticação.";
});
registerForm.addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#registerFeedback").textContent = "Cadastro demonstrativo. Para salvar os dados com segurança, conecte um backend ou serviço de autenticação.";
});
