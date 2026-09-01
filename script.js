/* =========================================================
   ССЫЛКА НА ОПЛАТУ (страница Bizon365)
   ---------------------------------------------------------
   Все кнопки «Принять участие / Оплатить» ведут сюда.
   На этой странице у клиента своя форма (имя, почта, телефон)
   и приём оплаты — данные вводятся ТАМ, не на лендинге.
   Чтобы поменять — впиши новую ссылку между кавычками.
========================================================= */
const CHECKOUT_URL = "https://anastasydiet.kassa.bizon365.ru/buy/intensiv-zhelezodeficit0";

/* ---- Все CTA-кнопки ведут на страницу оплаты ---- */
document.querySelectorAll(".js-cta").forEach((el) => {
  if (CHECKOUT_URL) el.setAttribute("href", CHECKOUT_URL);
});

/* ---- Плавная прокрутка для внутренних якорей (#...) ---- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id.length < 2) return;
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

/* ---- Липкая кнопка: прятать над блоком оплаты ---- */
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
