/* ============================================================
   SOMALILAND FAST FOOD — script.js
   ============================================================ */

/* ---- LOADER ---- */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1200);
});

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

/* ---- ACTIVE NAV LINKS ---- */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + current);
  });
}

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(l => {
  l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- SCROLL REVEAL ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('revealed');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ---- MENU DATA ---- */
const menuItems = [
  { name: 'Smash Burger', emoji: '🍔', price: 4.50, rating: 4.9, reviews: 312, desc: 'Double smash patty, special sauce, pickles, and crispy fried onions on a brioche bun.', badge: 'Bestseller', cat: 'burger' },
  { name: 'BBQ Bacon Burger', emoji: '🍔', price: 5.25, rating: 4.8, reviews: 241, desc: 'Smoky BBQ glaze, crispy bacon strips, cheddar, lettuce, and tomato.', badge: null, cat: 'burger' },
  { name: 'Margherita Pizza', emoji: '🍕', price: 6.00, rating: 4.7, reviews: 198, desc: 'Stone-baked base, San Marzano tomato sauce, buffalo mozzarella, and fresh basil.', badge: 'Fan Fave', cat: 'pizza' },
  { name: 'Pepperoni Pizza', emoji: '🍕', price: 7.00, rating: 4.9, reviews: 365, desc: 'Loaded with spicy pepperoni slices on our signature tomato-mozzarella base.', badge: 'Hot 🌶️', cat: 'pizza' },
  { name: 'Classic Shawarma', emoji: '🌯', price: 3.75, rating: 4.8, reviews: 289, desc: 'Slow-marinated chicken or beef wrapped in fluffy flatbread with garlic sauce.', badge: 'Bestseller', cat: 'chicken' },
  { name: 'Crispy Fried Chicken', emoji: '🍗', price: 5.50, rating: 4.7, reviews: 177, desc: 'Southern-style 3-piece crispy fried chicken with our secret spice blend.', badge: null, cat: 'chicken' },
  { name: 'Loaded Fries', emoji: '🍟', price: 2.50, rating: 4.6, reviews: 145, desc: 'Golden skin-on fries loaded with cheese sauce, jalapeños, and sour cream.', badge: null, cat: 'sides' },
  { name: 'Mango Smoothie', emoji: '🥭', price: 2.00, rating: 4.8, reviews: 210, desc: 'Fresh Somali mangoes blended with milk and a hint of cardamom.', badge: 'Fresh', cat: 'drinks' },
  { name: 'Classic Cola', emoji: '🥤', price: 1.00, rating: 4.5, reviews: 88, desc: 'Ice-cold cola served in a chilled glass — the perfect fast food companion.', badge: null, cat: 'drinks' },
  { name: 'Chicken Wrap', emoji: '🌮', price: 4.00, rating: 4.6, reviews: 160, desc: 'Grilled chicken strips, lettuce, tomato, and chipotle mayo in a warm flour tortilla.', badge: null, cat: 'chicken' },
  { name: 'Onion Rings', emoji: '🧅', price: 2.25, rating: 4.5, reviews: 120, desc: 'Thick-cut crispy golden onion rings served with our smoky dipping sauce.', badge: null, cat: 'sides' },
  { name: 'Strawberry Milkshake', emoji: '🍓', price: 2.75, rating: 4.9, reviews: 275, desc: 'Thick, creamy milkshake blended with real strawberries and topped with whipped cream.', badge: 'New', cat: 'drinks' },
];

/* ---- RENDER MENU CARDS ---- */
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? menuItems : menuItems.filter(i => i.cat === filter);
  filtered.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.setAttribute('data-cat', item.cat);
    card.style.setProperty('--delay', `${idx * 0.06}s`);
    card.setAttribute('data-reveal', '');
    card.innerHTML = `
      ${item.badge ? `<div class="menu-card-badge">${item.badge}</div>` : ''}
      <div class="menu-card-img">${item.emoji}</div>
      <div class="menu-card-body">
        <div class="menu-card-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-num">${item.rating} (${item.reviews})</span>
        </div>
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-desc">${item.desc}</div>
        <div class="menu-card-footer">
          <span class="menu-card-price">$${item.price.toFixed(2)}</span>
          <button class="add-cart-btn" aria-label="Add ${item.name} to cart" data-name="${item.name}" data-price="${item.price}" data-emoji="${item.emoji}">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
    // re-observe new cards
    revealObserver.observe(card);
  });
  // attach add-to-cart listeners
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.name, parseFloat(btn.dataset.price), btn.dataset.emoji));
  });
}
renderMenu();

/* ---- MENU FILTER ---- */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.filter);
  });
});

/* ---- CART STATE ---- */
let cart = [];

function addToCart(name, price, emoji) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, emoji, qty: 1 });
  }
  updateCartUI();
  showToast(`${emoji} ${name} added to cart!`);
  // bump count badge
  const countEl = document.getElementById('cart-count');
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');
}

function removeFromCart(name) {
  const idx = cart.findIndex(i => i.name === name);
  if (idx !== -1) cart.splice(idx, 1);
  updateCartUI();
}

function changeQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(name);
  else updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cart-count');
  const itemsEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total-price');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);

  countEl.textContent = totalQty;
  totalEl.textContent = `$${total.toFixed(2)}`;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<div class="cart-empty"><i class="fas fa-utensils"></i><p>Your cart is empty</p></div>';
  } else {
    itemsEl.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-emoji">${i.emoji}</div>
        <div class="cart-item-info">
          <strong>${i.name}</strong>
          <span>$${(i.price * i.qty).toFixed(2)}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty('${i.name}', -1)"><i class="fas fa-minus"></i></button>
          <span class="qty-num">${i.qty}</span>
          <button class="qty-btn" onclick="changeQty('${i.name}', 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    `).join('');
  }
}

/* ---- CART DRAWER ---- */
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
document.getElementById('open-cart').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);
function openCart() { cartDrawer.classList.add('open'); cartOverlay.classList.add('open'); }
function closeCart() { cartDrawer.classList.remove('open'); cartOverlay.classList.remove('open'); }

document.querySelector('.btn-checkout').addEventListener('click', () => {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  showToast('🎉 Order placed! Thank you!');
  cart = [];
  updateCartUI();
  closeCart();
});

/* ---- TOAST ---- */
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ---- CONTACT FORM ---- */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('form-success').classList.add('show');
  e.target.reset();
  setTimeout(() => document.getElementById('form-success').classList.remove('show'), 5000);
});

/* ---- SMOOTH SCROLL FOR ALL ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- KEYBOARD ACCESSIBILITY ---- */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});
