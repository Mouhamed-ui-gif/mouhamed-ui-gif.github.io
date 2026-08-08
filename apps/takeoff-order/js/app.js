/* ===== TakeOff Order app ===== */
const WA_NUMBER = "213557395808";
const WHATSAPP = "https://wa.me/" + WA_NUMBER;

const MENU = [
  { id: 1, cat: "pizza", price: 1400, img: "ig-la-fermiere", tag: "popular" },
  { id: 2, cat: "pizza", price: 1200, img: "real-pizza", tag: "new" },
  { id: 3, cat: "pizza", price: 1350, img: "real-pizza", tag: "chef" },
  { id: 4, cat: "burger", price: 1300, img: "ig-burger", tag: "popular" },
  { id: 5, cat: "burger", price: 1450, img: "real-burger-super-cheese", tag: "" },
  { id: 6, cat: "burger", price: 1300, img: "ig-croustille", tag: "chef" },
  { id: 7, cat: "pasta", price: 1350, img: "ig-pasta-burrata", tag: "chef" },
  { id: 8, cat: "pasta", price: 1200, img: "ig-pasta-delight", tag: "" },
  { id: 9, cat: "pasta", price: 1250, img: "ig-pasta-pesto", tag: "" },
  { id: 10, cat: "tacos", price: 1100, img: "real-tacos", tag: "popular" },
  { id: 11, cat: "tacos", price: 1200, img: "real-tacos", tag: "" },
  { id: 12, cat: "salad", price: 900, img: "real-caesar", tag: "popular" },
  { id: 13, cat: "salad", price: 850, img: "real-caprese", tag: "" },
  { id: 14, cat: "dessert", price: 700, img: "real-crepe", tag: "new" },
  { id: 15, cat: "dessert", price: 800, img: "real-tiramisu", tag: "chef" },
  { id: 16, cat: "dessert", price: 750, img: "real-brownie", tag: "new" },
  { id: 17, cat: "drink", price: 400, img: "real-mojito", tag: "new" },
  { id: 18, cat: "drink", price: 600, img: "real-frapuccino", tag: "" },
  { id: 19, cat: "drink", price: 350, img: "real-cappuccino", tag: "" },
  { id: 20, cat: "drink", price: 500, img: "real-mojito", tag: "new" },
];

window.APP_LANGS = {
  ar: {
    meta: { title: "TakeOff Order 🍂" },
    hero: { season: "موسم الخريف", sub: "اطلب من تايك أوف لاونج قسنطينة — يصل الطعام إليك دافئاً", cta1: "تصفح المنيو", cta2: "احجز طاولة" },
    menu: { title: "المنيو الكامل", sub: "أطباق حقيقية من مطبخ تايك أوف — بأسعار الداينار", note: "الأسعار بالدينار الجزائري وقابلة للتغيير · للتوصيل اتصل بنا" },
    tab: { all: "الكل", pizza: "بيتزا", burger: "برغر", pasta: "باستا ولازانيا", tacos: "تاكوس", salad: "سلطات", dessert: "كريب وحلويات", drink: "مشروبات" },
    tag: { popular: "الأكثر طلباً", new: "جديد", chef: "من اختيار الشيف" },
    add: "أضف إلى السلة",
    cart: { title: "سلة الطلب", empty: "سلتك فارغة — أضف بعض الأطباق", total: "المجموع", send: "أرسل الطلب عبر واتساب" },
    reserve: { title: "احجز طاولتك", sub: "تايك أوف لاونج — قسنطينة · 0557 39 58 08", name: "الاسم الكامل", phone: "رقم الهاتف", guests: "عدد الأشخاص", go: "إرسال الحجز", ok: "تم إرسال الحجز! سنتصل بك قريباً" },
    wa: { order: "طلب من تطبيق TakeOff:\n", reserve: "حجز طاولة من تطبيق TakeOff:\n", send: "تم إرسال طلبك عبر واتساب ✅" },
    audio: { leaves: "أوراق", rain: "مطر", thunder: "رعد", wind: "رياح", fire: "نار", music: "موسيقى" },
    names: { 1: "بيتزا الأجبان الثلاثة", 2: "بيتزا مارغريتا", 3: "بيتزا الدجاج المشوي", 4: "برغر كلاسيك", 5: "برغر رويال تشيز", 6: "برغر دجاج كرسبي", 7: "لازانيا بولونيز", 8: "باستا كاربونارا", 9: "ريزوتو الفطر", 10: "تاكوس الدجاج", 11: "تاكوس ميكس", 12: "سلطة سيزر", 13: "سلطة يونانية", 14: "كريب نوتيلا", 15: "تيراميسو منزلي", 16: "فوندان بالشوكولاتة", 17: "عصير طبيعي", 18: "ميلك شيك", 19: "سبيشل كافيه", 20: "موكتيل تايك أوف" },
    descs: { 1: "عجينة رقيقة مقرمشة مع مزيج من ثلاثة أجبان ذائبة فاخرة", 2: "صوص الطماطم، موزاريلا طازجة وريحان — الكلاسيكية الإيطالية", 3: "قطع دجاج مشوية، فلفل ملون، ذرة وصوص خاص", 4: "لحم بقري مشوي، جبن، خس، طماطم وصوص تايك أوف", 5: "برغر غني بطبقتين من الجبن الذائب مع لحم طازج", 6: "فيليه دجاج مقرمش مع صوص الثوم والجبن", 7: "طبقات باستا غنية بصوص اللحم والبيشاميل، تدخل الفرن طازجة", 8: "باستا كريمية بلمسة الشيف الخاصة", 9: "أرز كريمي مع فطر طازج وجبن بارميزان", 10: "تاكوس محمّل بقطع الدجاج، صوص الثوم والبطاطس", 11: "مزيج لحم ودجاج مع الصوصات الخاصة والجبن الذائب", 12: "السلطة الأشهر في المدينة — خس، دجاج مشوي، خبز محمص وصلصة سيزر", 13: "طماطم، خيار، فلفل، جبن فيتا وزيتون مع زيت الزيتون", 14: "كريب طري محشو بالنوتيلا مع سكر بودرة", 15: "تحلية إيطالية كلاسيكية بطبقات الماسكاربوني والقهوة", 16: "كيك الشوكولاتة الذائب مع نواة سائلة", 17: "عصائر طازجة: برتقال، ليمون، أفوكادو", 18: "ميلك شيك كريمي بنكهات متعددة", 19: "قهوة مختصة وسبيشل كافيه بلمسة الشيف", 20: "مشروب منعش بدون كحول بلمسة الطيران الخاصة" }
  },
  fr: {
    meta: { title: "TakeOff Order 🍂" },
    hero: { season: "Saison d'automne", sub: "Commandez chez TakeOff Lounge Constantine — la nourriture arrive chaude chez vous", cta1: "Voir le menu", cta2: "Réserver une table" },
    menu: { title: "Menu complet", sub: "De vrais plats de la cuisine TakeOff — prix en dinars", note: "Prix en dinars algériens, sujets à modification · Livraison sur appel" },
    tab: { all: "Tout", pizza: "Pizza", burger: "Burger", pasta: "Pâtes & Lasagnes", tacos: "Tacos", salad: "Salades", dessert: "Crêpes & Desserts", drink: "Boissons" },
    tag: { popular: "Le plus demandé", new: "Nouveau", chef: "Choix du chef" },
    add: "Ajouter au panier",
    cart: { title: "Panier", empty: "Votre panier est vide — ajoutez des plats", total: "Total", send: "Envoyer la commande WhatsApp" },
    reserve: { title: "Réserver votre table", sub: "TakeOff Lounge — Constantine · 0557 39 58 08", name: "Nom complet", phone: "Téléphone", guests: "Nombre de personnes", go: "Envoyer la réservation", ok: "Réservation envoyée ! Nous vous appellerons bientôt" },
    wa: { order: "Commande de l'app TakeOff:\n", reserve: "Réservation de l'app TakeOff:\n", send: "Commande envoyée via WhatsApp ✅" },
    audio: { leaves: "Feuilles", rain: "Pluie", thunder: "Tonnerre", wind: "Vent", fire: "Feu", music: "Musique" },
    names: { 1: "Pizza 3 Fromages", 2: "Pizza Margherita", 3: "Pizza Poulet Grillé", 4: "Burger Classique", 5: "Burger Royal Cheese", 6: "Burger Chicken Crispy", 7: "Lasagnes Bolognaise", 8: "Pâtes Carbonara", 9: "Risotto aux Champignons", 10: "Tacos Poulet", 11: "Tacos Mixte", 12: "Salade César", 13: "Salade Grecque", 14: "Crêpes au Nutella", 15: "Tiramisu Maison", 16: "Fondant au Chocolat", 17: "Jus Frais", 18: "Milkshake", 19: "Café Spécial", 20: "Mocktail TakeOff" },
    descs: { 1: "Pâte fine et croustillante avec un mélange de trois fromages fondus", 2: "Sauce tomate, mozzarella fraîche et basilic — le classique italien", 3: "Morceaux de poulet grillé, poivrons, maïs et sauce spéciale", 4: "Bœuf grillé, fromage, salade, tomate et sauce TakeOff", 5: "Burger riche en deux couches de fromage fondant", 6: "Filet de poulet croustillant, sauce à l'ail et fromage", 7: "Couches de pâtes riches à la sauce bolognaise et béchamel", 8: "Pâtes crémeuses avec la touche du chef", 9: "Riz crémeux aux champignons frais et parmesan", 10: "Tacos garni de poulet, sauce à l'ail et frites", 11: "Mélange viande et poulet avec sauces spéciales", 12: "La salade la plus connue de la ville — poulet grillé, croûtons", 13: "Tomates, concombre, poivrons, feta et olives", 14: "Crêpe moelleuse au Nutella et sucre glace", 15: "Dessert italien classique au mascarpone et café", 16: "Gâteau au chocolat fondant au cœur liquide", 17: "Jus frais : orange, citron, avocat", 18: "Milkshake crémeux en plusieurs parfums", 19: "Café de spécialité avec la touche du chef", 20: "Boisson rafraîchissante sans alcool, touche aérienne" }
  },
  en: {
    meta: { title: "TakeOff Order 🍂" },
    hero: { season: "Autumn season", sub: "Order from TakeOff Lounge Constantine — food arrives warm at your door", cta1: "Browse menu", cta2: "Reserve a table" },
    menu: { title: "Full menu", sub: "Real dishes from the TakeOff kitchen — prices in dinars", note: "Prices in Algerian dinars, subject to change · Delivery on call" },
    tab: { all: "All", pizza: "Pizza", burger: "Burger", pasta: "Pasta & Lasagna", tacos: "Tacos", salad: "Salads", dessert: "Crêpes & Desserts", drink: "Drinks" },
    tag: { popular: "Most popular", new: "New", chef: "Chef's choice" },
    add: "Add to cart",
    cart: { title: "Cart", empty: "Your cart is empty — add some dishes", total: "Total", send: "Send order via WhatsApp" },
    reserve: { title: "Reserve your table", sub: "TakeOff Lounge — Constantine · 0557 39 58 08", name: "Full name", phone: "Phone number", guests: "Number of guests", go: "Send reservation", ok: "Reservation sent! We'll call you soon" },
    wa: { order: "Order from the TakeOff app:\n", reserve: "Reservation from the TakeOff app:\n", send: "Order sent via WhatsApp ✅" },
    audio: { leaves: "Leaves", rain: "Rain", thunder: "Thunder", wind: "Wind", fire: "Fire", music: "Music" },
    names: { 1: "Three Cheese Pizza", 2: "Margherita Pizza", 3: "Grilled Chicken Pizza", 4: "Classic Burger", 5: "Royal Cheese Burger", 6: "Crispy Chicken Burger", 7: "Lasagna Bolognese", 8: "Carbonara Pasta", 9: "Mushroom Risotto", 10: "Chicken Tacos", 11: "Mixed Tacos", 12: "Caesar Salad", 13: "Greek Salad", 14: "Nutella Crêpes", 15: "Homemade Tiramisu", 16: "Chocolate Fondant", 17: "Fresh Juice", 18: "Milkshake", 19: "Special Coffee", 20: "TakeOff Mocktail" },
    descs: { 1: "Thin crispy dough with a blend of three melted cheeses", 2: "Tomato sauce, fresh mozzarella and basil — the Italian classic", 3: "Grilled chicken chunks, bell peppers, corn and special sauce", 4: "Grilled beef, cheese, lettuce, tomato and TakeOff sauce", 5: "Rich burger with two layers of melted cheese", 6: "Crispy chicken fillet with garlic and cheese sauce", 7: "Rich pasta layers with meat sauce and béchamel, baked fresh", 8: "Creamy pasta with the chef's special touch", 9: "Creamy rice with fresh mushrooms and parmesan", 10: "Loaded tacos with chicken, garlic sauce and fries", 11: "Beef and chicken mix with special sauces and melted cheese", 12: "The most famous salad in town — lettuce, grilled chicken, croutons", 13: "Tomatoes, cucumber, peppers, feta and olives with olive oil", 14: "Soft crêpe filled with Nutella and powdered sugar", 15: "Classic Italian dessert with mascarpone layers and coffee", 16: "Melting chocolate cake with a liquid core", 17: "Fresh juices: orange, lemon, avocado", 18: "Creamy milkshake in multiple flavors", 19: "Specialty coffee with the chef's touch", 20: "Refreshing alcohol-free drink with a special flying touch" }
  }
};

let cart = {};
let currentCat = "all";

function render() {
  const grid = document.getElementById("menuGrid");
  const l = document.documentElement.lang || "ar";
  const dict = window.APP_LANGS[l] || window.APP_LANGS.ar;
  const items = MENU.filter((m) => currentCat === "all" || m.cat === currentCat);
  grid.innerHTML = items.map((m) => `
    <article class="dish reveal">
      <div class="dish-img">${m.tag ? `<span class="dish-tag">${dict.tag[m.tag]}</span>` : ""}<img src="${m.img}.jpg" alt="${dict.names[m.id]}" loading="lazy"></div>
      <div class="dish-body">
        <h4><span>${dict.names[m.id]}</span><span class="dish-price">${m.price.toLocaleString("en-US")} DA</span></h4>
        <p>${dict.descs[m.id]}</p>
        <button class="dish-add" data-add="${m.id}">+ ${dict.add}</button>
      </div>
    </article>`).join("");
  grid.querySelectorAll("[data-add]").forEach((b) => b.addEventListener("click", () => addToCart(+b.dataset.add)));
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("revealed"), io.unobserve(e.target))), { threshold: 0.05 });
  grid.querySelectorAll(".reveal").forEach((e) => io.observe(e));
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCart();
  document.getElementById("cart").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function updateCart() {
  const l = document.documentElement.lang || "ar";
  const dict = window.APP_LANGS[l] || window.APP_LANGS.ar;
  const list = document.getElementById("cartList");
  const total = Object.entries(cart).reduce((s, [id, q]) => s + (MENU.find((m) => m.id === +id)?.price || 0) * q, 0);
  document.getElementById("cartCount").textContent = Object.values(cart).reduce((a, b) => a + b, 0);
  document.getElementById("cartTotal").textContent = total.toLocaleString("en-US") + " DA";
  if (!Object.keys(cart).length) {
    list.innerHTML = `<p class="empty-cart">${dict.cart.empty}</p>`;
    return;
  }
  list.innerHTML = Object.entries(cart).map(([id, q]) => {
    const m = MENU.find((x) => x.id === +id);
    return `<div class="cart-item">
      <img src="${m.img}.jpg" alt="">
      <div class="cart-item-info"><b>${dict.names[m.id]}</b><small>${(m.price * q).toLocaleString("en-US")} DA</small></div>
      <div class="cart-qty">
        <button data-dec="${m.id}">−</button><b>${q}</b><button data-inc="${m.id}">+</button>
      </div>
    </div>`;
  }).join("");
  list.querySelectorAll("[data-inc]").forEach((b) => b.addEventListener("click", () => { cart[+b.dataset.inc]++; updateCart(); }));
  list.querySelectorAll("[data-dec]").forEach((b) => b.addEventListener("click", () => { cart[+b.dataset.dec]--; if (cart[+b.dataset.dec] <= 0) delete cart[+b.dataset.dec]; updateCart(); }));
}

document.addEventListener("DOMContentLoaded", () => {
  render();

  document.getElementById("menuTabs").addEventListener("click", (e) => {
    const b = e.target.closest(".mtab");
    if (!b) return;
    document.querySelectorAll(".mtab").forEach((x) => x.classList.remove("on"));
    b.classList.add("on");
    currentCat = b.dataset.cat;
    render();
  });

  const cartEl = document.getElementById("cart"), overlay = document.getElementById("cartOverlay");
  document.querySelector(".cart-btn").addEventListener("click", () => { cartEl.classList.add("open"); overlay.classList.add("open"); });
  document.getElementById("cartClose").addEventListener("click", () => { cartEl.classList.remove("open"); overlay.classList.remove("open"); });
  overlay.addEventListener("click", () => { cartEl.classList.remove("open"); overlay.classList.remove("open"); });

  document.getElementById("cartSend").addEventListener("click", () => {
    const l = document.documentElement.lang || "ar";
    const dict = window.APP_LANGS[l] || window.APP_LANGS.ar;
    if (!Object.keys(cart).length) return;
    let msg = dict.wa.order;
    let total = 0;
    for (const [id, q] of Object.entries(cart)) {
      const m = MENU.find((x) => x.id === +id);
      msg += `• ${dict.names[m.id]} × ${q} = ${(m.price * q).toLocaleString("en-US")} DA\n`;
      total += m.price * q;
    }
    msg += `=${dict.cart.total}: ${total.toLocaleString("en-US")} DA`;
    window.open(WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
    alert(dict.wa.send);
  });

  document.getElementById("reserveForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const l = document.documentElement.lang || "ar";
    const dict = window.APP_LANGS[l] || window.APP_LANGS.ar;
    const f = e.target;
    const inp = f.querySelectorAll("input");
    const msg = dict.wa.reserve + `• ${inp[0].value}\n• ${inp[1].value}\n• ${dict.reserve.guests}: ${inp[2].value}\n• ${dict.reserve.go}: ${inp[3].value}`;
    window.open(WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank");
    document.getElementById("reserveOk").hidden = false;
    f.reset();
    setTimeout(() => (document.getElementById("reserveOk").hidden = true), 5000);
  });

  // re-render translations that depend on lang (menu/cart)
  new MutationObserver(() => render()).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });

  // audio chips
  document.querySelectorAll(".audio-chip").forEach((c) => {
    c.addEventListener("click", () => c.classList.toggle("on") && window.MGaudio && MGaudio.toggle(c.dataset.audio));
  });
  const vol = document.getElementById("vol");
  vol.addEventListener("input", () => window.MGaudio && MGaudio.setVolume(+vol.value));
});
