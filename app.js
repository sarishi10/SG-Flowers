// Demo catalogue based on SG Flowers' supplied published menus.
// Product art is illustrative; this project does not process payments.
const PRODUCTS = [
  {id:'jasmine-s',name:'Jasmine Garland — Small',category:'Garlands',price:4,detail:'0.5 ft · Jasmine with roses',icon:'✿',tag:'DAILY PRAYER'},
  {id:'jasmine-m',name:'Jasmine Garland — Medium',category:'Garlands',price:7,detail:'1 ft · Jasmine with roses',icon:'✿',tag:'POPULAR'},
  {id:'jasmine-l',name:'Jasmine Garland — Large',category:'Garlands',price:15,detail:'1.5 ft · Jasmine with roses',icon:'✿',tag:'FESTIVE'},
  {id:'rose-m',name:'Rose Garland — Medium',category:'Garlands',price:10,detail:'1 ft · Red and yellow roses',icon:'❀',tag:'BEST LOVED'},
  {id:'rose-l',name:'Rose Garland — Large',category:'Garlands',price:14,detail:'1.5 ft · Rose garland',icon:'❀',tag:'TRADITIONAL'},
  {id:'arugampul-s',name:'Arugampul Garland — Small',category:'Garlands',price:5,detail:'0.5 ft · Grass intertwined with roses',icon:'❋',tag:'GANESHA OFFERING'},
  {id:'sampangi-l',name:'Sampangi Garland — Large',category:'Garlands',price:14,detail:'1.5 ft · Tube rose and rose',icon:'✾',tag:'TRADITIONAL'},
  {id:'sampangi-s',name:'Sampangi Garland — Small',category:'Garlands',price:7,detail:'0.5 ft · Tube rose and rose',icon:'✽',tag:'DAILY PRAYER'},
  {id:'jasmine-ball',name:'Jasmine Flower Ball',category:'Flower Balls',price:12,detail:'Approx. 7–8 ft flower string',icon:'❀',tag:'FRAGRANT'},
  {id:'mullai-ball',name:'Mullai Flower Ball',category:'Flower Balls',price:12,detail:'Approx. 7–8 ft flower string',icon:'✿',tag:'FRESH'},
  {id:'arali-ball',name:'Arali Flower Ball',category:'Flower Balls',price:13,detail:'Approx. 7–8 ft oleander flower string',icon:'✾',tag:'COLOURFUL'},
  {id:'sampangi-ball',name:'Sampangi Flower Ball',category:'Flower Balls',price:9,detail:'Tube rose, roses and foliage',icon:'❋',tag:'CLASSIC'},
  {id:'glr-jasmine',name:'GLR Bathi Jasmine',category:'Prayer Essentials',price:5,detail:'Incense · 1 box',icon:'✣',tag:'PRAYER ITEM'},
  {id:'glr-neem',name:'GLR Bathi Neem',category:'Prayer Essentials',price:5,detail:'Incense · 1 box',icon:'✣',tag:'PRAYER ITEM'},
  {id:'glr-thulasi',name:'GLR Bathi Thulasi',category:'Prayer Essentials',price:5,detail:'Incense · 1 box',icon:'✣',tag:'PRAYER ITEM'},
  {id:'glr-homam',name:'GLR Bathi Homam',category:'Prayer Essentials',price:5,detail:'Incense · 1 box',icon:'✣',tag:'PRAYER ITEM'}
];
const $=s=>document.querySelector(s);let category='All',query='',cart={};
const PHOTO_BY_ID={
 'jasmine-s':'sgraw-003.png','jasmine-m':'sgraw-005.png','jasmine-l':'sgraw-001.png',
 'rose-m':'sgraw8-003.png','rose-l':'sgraw8-005.png','arugampul-s':'sgraw9-001.png',
 'sampangi-l':'sgraw10-007.png','sampangi-s':'sgraw10-005.png',
 'jasmine-ball':'sgraw14-003.png','mullai-ball':'sgraw14-005.png',
 'arali-ball':'sgraw15-001.png','sampangi-ball':'sgraw15-003.png',
 'glr-jasmine':'sgprayer-001.png','glr-neem':'sgprayer-003.png',
 'glr-thulasi':'sgprayer-005.png','glr-homam':'sgprayer-008.png'
};
const photo=id=>'assets/'+PHOTO_BY_ID[id];
const money=n=>'S$'+n.toFixed(2);
function productCard(p){return `<article class="product"><div class="product-media"><small>${p.tag}</small><img class="product-photo" src="${photo(p.id)}" alt="${p.name} from SG Flowers menu" loading="lazy"><button class="quick-add" data-add="${p.id}">+ Add to bag</button></div><div class="product-info"><small>${p.category}</small><h3>${p.name}</h3><p>${p.detail}</p><b>${money(p.price)}</b><button data-add="${p.id}">+ Add to bag</button></div></article>`}
function renderProducts(){const list=PRODUCTS.filter(p=>(category==='All'||p.category===category)&&(p.name+' '+p.detail).toLowerCase().includes(query));$('#products').innerHTML=list.length?list.map(productCard).join(''):'<p>No items matched. Try another search.</p>';document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.add)));document.querySelectorAll('#filters button').forEach(b=>b.classList.toggle('active',b.dataset.category===category))}
function toast(message){const t=$('#toast');t.textContent=message;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),2500)}
function add(id){cart[id]=(cart[id]||0)+1;renderCart();toast('Added to your flower bag ✿')}
function change(id,n){cart[id]=Math.max(0,(cart[id]||0)+n);if(!cart[id])delete cart[id];renderCart()}
function renderCart(){const entries=Object.entries(cart);const count=entries.reduce((s,[,q])=>s+q,0);$('#cart-count').textContent=count;$('#drawer-count').textContent=`(${count})`;$('#cart-items').innerHTML=entries.length?entries.map(([id,qty])=>{const p=PRODUCTS.find(x=>x.id===id);return `<div class="cart-item"><div class="cart-icon"><img src="${photo(id)}" alt=""></div><div><h4>${p.name}</h4><small>${money(p.price)}</small><div class="qty"><button data-minus="${id}" aria-label="Decrease ${p.name}">−</button><span>${qty}</span><button data-plus="${id}" aria-label="Increase ${p.name}">+</button></div></div><b>${money(p.price*qty)}</b></div>`}).join(''):'<div class="cart-empty"><span>✿</span><p>Your flower bag is empty.</p><a href="#shop" class="text-link" id="empty-shop">Explore flowers →</a></div>';$('#subtotal').textContent=money(entries.reduce((s,[id,q])=>s+PRODUCTS.find(p=>p.id===id).price*q,0));document.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>change(b.dataset.minus,-1));document.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>change(b.dataset.plus,1));const e=$('#empty-shop');if(e)e.onclick=closeCart}
function openCart(){$('#shade').hidden=false;$('#drawer').classList.add('open');$('#drawer').setAttribute('aria-hidden','false');document.body.style.overflow='hidden';$('#cart-close').focus()}
function closeCart(){$('#shade').hidden=true;$('#drawer').classList.remove('open');$('#drawer').setAttribute('aria-hidden','true');document.body.style.overflow=''}
function dayWindow(date){return ['Closed — contact us for exceptions','4pm–9pm','12pm–5pm','4pm–9pm','12pm–5pm','12pm–5pm','4pm–9pm'][date.getDay()]}
function parseLocalDate(v){if(!v)return null;const [y,m,d]=v.split('-').map(Number);return new Date(y,m-1,d)}
function localIso(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function updateDate(){const d=parseLocalDate($('#date').value);if(!d)return;$('#date-help').textContent=dayWindow(d)+(d.getDay()===0?' · Please WhatsApp us for a special occasion exception.':' · Subject to availability.');$('#date-help').style.color=d.getDay()===0?'#a35757':'#72806f'}
function checkout(){const entries=Object.entries(cart);if(!entries.length)return toast('Please add flowers first.');const date=$('#date').value,name=$('#customer').value.trim(),postal=$('#postal').value.trim();if(!date)return toast('Please choose a delivery date.');if(!name)return toast('Please enter your name.');if(!postal)return toast('Please enter a postal code or self-collection.');const d=parseLocalDate(date),min=new Date();min.setHours(0,0,0,0);min.setDate(min.getDate()+3);if(d<min)return toast('Please allow at least 3 days for regular orders.');if(d.getDay()===0)return toast('Sunday delivery needs direct confirmation.');const lines=entries.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);return `• ${p.name} × ${q} — ${money(p.price*q)}`});const total=entries.reduce((s,[id,q])=>s+PRODUCTS.find(p=>p.id===id).price*q,0);const message=`Hello SG Flowers! 🌸 I'd like to enquire about this order:\n\n${lines.join('\n')}\n\nSubtotal: ${money(total)} (delivery additional)\nName: ${name}\nPreferred delivery: ${date} (${dayWindow(d)})\nDelivery postcode / collection: ${postal}\nNotes: ${$('#notes').value.trim()||'None'}\n\nPlease confirm availability, final delivery fee and payment instructions.`;window.open('https://wa.me/6597220961?text='+encodeURIComponent(message),'_blank','noopener')}
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>{category=b.dataset.category;renderProducts();if(b.closest('.collections'))$('#shop').scrollIntoView({behavior:'smooth'})}));$('#search').addEventListener('input',e=>{query=e.target.value.toLowerCase();renderProducts()});$('#cart-open').onclick=openCart;$('#cart-close').onclick=closeCart;$('#shade').onclick=closeCart;document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart()});$('#checkout').onclick=checkout;$('#date').onchange=updateDate;$('#menu').onclick=()=>$('#nav').classList.toggle('open');document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>$('#nav').classList.remove('open'));$('#year').textContent=new Date().getFullYear();const minDate=new Date();minDate.setDate(minDate.getDate()+3);$('#date').min=localIso(minDate);renderProducts();renderCart();

// Actual identity and cutout product photography extracted from the supplied SG Flowers menus.
document.querySelectorAll('.logo').forEach(el=>{
  el.innerHTML='<img src="assets/sgraw-007.png" alt="SG Flowers Singapore official orchid logo" width="61" height="61"><span>SG Flowers</span>';
});
$('.hero-art').innerHTML=`<div class="hero-photo-scene"><span class="hero-ring"></span><img class="hero-product hero-primary" src="assets/sgraw8-001.png" alt="SG Flowers rose garland"><img class="hero-product hero-secondary" src="assets/sgraw-001.png" alt="SG Flowers jasmine garland"><img class="hero-product hero-tertiary" src="assets/sgraw9-001.png" alt="SG Flowers Arugampul garland"><div class="hero-sticker">Fresh for<br><b>your prayers</b> ✿</div></div>`;
const collectionPhotos={Garlands:'sgraw8-001.png','Flower Balls':'sgraw14-003.png','Prayer Essentials':'sgprayer-001.png'};
document.querySelectorAll('.collections button').forEach(b=>{
  const span=b.querySelector('.collection-symbol');
  span.outerHTML=`<img class="collection-photo" src="assets/${collectionPhotos[b.dataset.category]}" alt="SG Flowers ${b.dataset.category}" loading="lazy">`;
});
$('.about-visual').innerHTML='<img src="assets/sgraw-007.png" alt="SG Flowers Singapore" class="story-logo"><h3>Prepared with<br><em>love & intention.</em></h3>';
