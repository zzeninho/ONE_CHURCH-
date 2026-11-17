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

async function enviar(url, dados) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  });
  const json = await resp.json().catch(() => ({}));
  return { ok: resp.ok, json };
}

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  const feedback = document.querySelector("#loginFeedback");
  const { ok, json } = await enviar('/api/login', {
    email: document.querySelector("#loginEmail").value,
    senha: document.querySelector("#loginPassword").value
  });
  if (!ok) { feedback.textContent = json.erro || 'Erro ao entrar.'; return; }
  localStorage.setItem('token', json.token);
  localStorage.setItem('nome', json.nome);
  window.location.href = 'index.html';
});

registerForm.addEventListener("submit", async event => {
  event.preventDefault();
  const feedback = document.querySelector("#registerFeedback");
  const { ok, json } = await enviar('/api/cadastro', {
    nome: document.querySelector("#registerName").value,
    email: document.querySelector("#registerEmail").value,
    senha: document.querySelector("#registerPassword").value
  });
  if (!ok) { feedback.textContent = json.erro || 'Erro ao cadastrar.'; return; }
  showForm('login');
  document.querySelector("#loginFeedback").textContent = 'Conta criada! Agora é só entrar.';
});