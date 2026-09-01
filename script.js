/* =========================================================
   ССЫЛКА НА ОПЛАТУ
   ---------------------------------------------------------
   Вставь между кавычками ссылку на страницу оплаты
   (Prodamus / ЮKassa / GetCourse / ChatPlace и т.п.).
   Пример: const CHECKOUT_URL = "https://payform.ru/xxxxx/";
   Пока ссылка пустая — кнопка «Оплатить» показывает подсказку.
========================================================= */
const CHECKOUT_URL = "";

/* ---- Плавная прокрутка по якорям ---- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---- Появление блоков при скролле ---- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("in");
        io.unobserve(en.target);
      }
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---- Липкая кнопка: прятать над формой оплаты ---- */
const sticky = document.getElementById("stickybar");
const paySection = document.getElementById("oplata");
if (sticky && paySection) {
  const io2 = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        sticky.style.transform = en.isIntersecting ? "translateY(120%)" : "translateY(0)";
        sticky.style.transition = "transform .3s ease";
      });
    },
    { threshold: 0.05 }
  );
  io2.observe(paySection);
}

/* ---- Форма оплаты ---- */
const form = document.getElementById("payform");
const hint = document.getElementById("payhint");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (CHECKOUT_URL) {
      // передаём данные покупателя в ссылку оплаты
      const data = new FormData(form);
      const params = new URLSearchParams();
      for (const [k, v] of data.entries()) {
        if (typeof v === "string") params.append(k, v);
      }
      const sep = CHECKOUT_URL.includes("?") ? "&" : "?";
      window.location.href = CHECKOUT_URL + sep + params.toString();
    } else {
      hint.textContent = "Ссылка на оплату скоро будет подключена. Напишите в Telegram @anastasy_d — оформим участие вручную.";
    }
  });
}
