/* ==========================================
   Plateful — app.js (Vanilla JS) — v2
   Fixes included:
   - Liked after swipe works + auto-jump to Liked when deck ends
   - Shopping back returns to Ingredients
   - Cooking Mode: light UI + Wake Lock (no dark screen)
   ========================================== */

/* ---------- Data ---------- */
const liked = [
    { id:"garlic-shrimp", title:"Garlic Shrimp", time:"15 min", kcal:380, servings:"2", img:"images/garlic-shrimp.png" },
    { id:"tacos", title:"Weeknight Beef Tacos", time:"25 min", kcal:520, servings:"4", img:"images/tacos.png" }
  ];
  
  const swipeMeals = [
    { id:"garlic-shrimp", title:"Garlic Shrimp", time:"15 min", kcal:380, servings:2, img:"images/garlic-shrimp.png" },
    { id:"honey-garlic-chicken", title:"Honey Garlic Chicken", time:"20 min", kcal:440, servings:2, img:"images/honey-garlic-chicken.png" },
    { id:"teriyaki-chicken-rice", title:"Teriyaki Chicken Rice", time:"25 min", kcal:600, servings:2, img:"images/teriyaki-chicken-rice.png" },
    { id:"chickpea-sweet-potato", title:"Chickpea & Sweet Potato Curry", time:"35 min", kcal:400, servings:2, img:"images/chickpea-curry.png" }
  ];
  
  /* recipe metadata can include tips & recos for the finish screen */
  const recipeById = {
    "garlic-shrimp": {
      title: "Garlic Shrimp", img: "images/garlic-shrimp.png", time: "15 min", kcal: "380 kcal", baseServings: 2,
      tips: ["Finish with lemon zest and a splash of olive oil.","Serve over buttered noodles or with crusty bread."],
      recos: ["Weeknight Beef Tacos","Teriyaki Chicken Rice"],
      ingredients: [
        { item: "Shrimp, peeled & deveined", qty: 300, unit: "g" },
        { item: "Butter or olive oil", qty: 1, unit: "tbsp" },
        { item: "Garlic, minced", qty: 3, unit: "cloves" },
        { item: "Honey (optional)", qty: 1, unit: "tbsp" },
        { item: "Lemon juice", qty: 1, unit: "tbsp" },
        { item: "Parsley, chopped", qty: 1, unit: "tbsp" },
        { item: "Salt", qty: 0.5, unit: "tsp" },
        { item: "Black pepper", qty: 0.25, unit: "tsp" }
      ],
      steps: [
        "Pat shrimp dry and season with salt and pepper.",
        "Heat butter/oil in a skillet over medium-high.",
        "Cook shrimp 1–2 minutes per side until pink.",
        "Lower heat; add garlic 20–30 seconds (don’t brown).",
        "Stir in lemon juice (and honey if using) to glaze.",
        "Off heat; finish with parsley. Serve immediately."
      ]
    },
    "tacos": {
      title: "Weeknight Beef Tacos", img: "images/tacos.png", time: "25 min", kcal: "520 kcal", baseServings: 4,
      tips: ["Warm tortillas wrapped in a towel for softer bites.","Add chopped cilantro and a quick lime crema."],
      recos: ["Garlic Shrimp","Chickpea & Sweet Potato Curry"],
      ingredients: [
        { item: "Ground beef (or turkey)", qty: 500, unit: "g" },
        { item: "Neutral oil", qty: 1, unit: "tbsp" },
        { item: "Onion, finely chopped", qty: 0.5, unit: "pc" },
        { item: "Garlic, minced", qty: 2, unit: "cloves" },
        { item: "Tomato paste", qty: 1, unit: "tbsp" },
        { item: "Chili powder", qty: 1, unit: "tsp" },
        { item: "Ground cumin", qty: 1, unit: "tsp" },
        { item: "Smoked paprika", qty: 0.5, unit: "tsp" },
        { item: "Salt", qty: 1, unit: "tsp" },
        { item: "Black pepper", qty: 0.25, unit: "tsp" },
        { item: "Water or stock", qty: 80, unit: "ml" },
        { item: "Small tortillas", qty: 8, unit: "pc" },
        { item: "Shredded lettuce", qty: 2, unit: "cups" },
        { item: "Diced tomatoes", qty: 1, unit: "cup" },
        { item: "Cheddar, shredded", qty: 120, unit: "g" },
        { item: "Sour cream (optional)", qty: 0.5, unit: "cup" },
        { item: "Lime wedges (to serve)", qty: 2, unit: "pc" }
      ],
      steps: [
        "Sauté onion in oil 3 minutes; add garlic 30 seconds.",
        "Brown the beef, breaking it up. Drain excess fat.",
        "Stir in tomato paste & spices; cook 1 minute.",
        "Add water/stock; simmer 2–3 minutes until saucy.",
        "Warm tortillas; assemble with toppings.",
        "Squeeze lime, serve immediately."
      ]
    },
    "honey-garlic-chicken": {
      title:"Honey Garlic Chicken", img:"images/honey-garlic-chicken.png", time:"20 min", kcal:"440 kcal", baseServings:2,
      tips: ["Finish with sesame and scallions.", "Great with steamed broccoli."],
      recos: ["Garlic Shrimp","Teriyaki Chicken Rice"],
      ingredients: [
        { item:"Chicken thighs", qty:400, unit:"g" },
        { item:"Butter", qty:1, unit:"tbsp" },
        { item:"Garlic, minced", qty:2, unit:"cloves" },
        { item:"Honey", qty:2, unit:"tbsp" },
        { item:"Soy sauce", qty:1, unit:"tbsp" }
      ],
      steps: ["Sear chicken until browned.","Add butter and garlic briefly.","Stir in honey + soy; simmer until glossy.","Serve over rice, garnish to taste."]
    },
    "teriyaki-chicken-rice": {
      title:"Teriyaki Chicken Rice", img:"images/teriyaki-chicken-rice.png", time:"25 min", kcal:"600 kcal", baseServings:2,
      tips: ["Add a knob of butter to the rice for shine.","Sprinkle toasted sesame seeds."],
      recos: ["Honey Garlic Chicken","Chickpea & Sweet Potato Curry"],
      ingredients: [
        { item:"Chicken breast", qty:300, unit:"g" },
        { item:"Neutral oil", qty:1, unit:"tbsp" },
        { item:"Soy sauce", qty:3, unit:"tbsp" },
        { item:"Honey (or brown sugar)", qty:2, unit:"tbsp" },
        { item:"Rice vinegar or lemon juice", qty:1, unit:"tbsp" },
        { item:"Garlic, minced", qty:1, unit:"clove" },
        { item:"Spring onions, sliced", qty:2, unit:"stalks" },
        { item:"Sesame seeds", qty:1, unit:"tbsp" }
      ],
      steps: ["Cut chicken into pieces and brown in oil.","Mix soy, honey, vinegar, garlic; add to pan, simmer.","Thicken if desired; finish with sesame & scallion.","Serve over rice."]
    },
    "chickpea-sweet-potato": {
      title:"Chickpea & Sweet Potato Curry", img:"images/chickpea-curry.png", time:"35 min", kcal:"400 kcal", baseServings:2,
      tips: ["Stir in spinach right at the end.","Serve with rice or naan."],
      recos: ["Weeknight Beef Tacos","Teriyaki Chicken Rice"],
      ingredients: [
        { item:"Sweet potato, peeled & cubed", qty:350, unit:"g" },
        { item:"Chickpeas (drained)", qty:240, unit:"g" },
        { item:"Coconut milk", qty:200, unit:"ml" },
        { item:"Curry paste/powder", qty:1, unit:"tbsp" },
        { item:"Onion, chopped", qty:0.5, unit:"pc" },
        { item:"Spinach", qty:2, unit:"handfuls" }
      ],
      steps: ["Sauté onion 3–4 min.","Add sweet potato + curry; cook briefly.","Add coconut milk + water; simmer until tender.","Add chickpeas 5 min; fold in spinach. Season."]
    }
  };
  
  /* ---------- Utilities ---------- */
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  let currentScreen = "splash";
  
  const show = id => {
    document.querySelectorAll('.screen').forEach(el=>el.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    currentScreen = id;
    window.scrollTo({top:0,behavior:'instant'});
  };
  
  const showToast = (msg) => {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(()=>t.classList.remove('show'), 1600);
  };
  
  /* localStorage helpers (used by Pantry/Shopping) */
  const LS = { shopping:'plateful.shopping', pantry:'plateful.pantry', favorites:'plateful.favorites' };
  const load = (k, fallback=[]) => { try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; } };
  const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
  
  /* ---------- Global nav ---------- */
  document.addEventListener('click', (e)=>{
    const go = e.target.closest('[data-go]');
    if (go){
      const dest = go.getAttribute('data-go');
      if (dest==='home') renderHome();
      if (dest==='liked') renderLiked();
      if (dest==='shopping') renderShopping();
      if (dest==='pantry') renderPantry();
      show(dest);
      return;
    }
    const toast = e.target.closest('[data-toast]');
    if (toast){ showToast(toast.getAttribute('data-toast')); }
  });
  
  /* ---------- Startup ---------- */
  setTimeout(()=>{ show('home'); renderHome(); }, 600);
  
  /* ---------- Home ---------- */
  function renderHome(){
    const wrap = $('#like-list'); wrap.innerHTML = '';
    liked.forEach(r=>{
      const card = document.createElement('article');
      card.className = 'card recipe-card';
      card.innerHTML = `
        <img class="recipe-cover" src="${r.img}" alt="${r.title}" onerror="this.style.background='#ddd'; this.src='';">
        <div class="recipe-info">
          <div class="title"><strong>${r.title}</strong></div>
          <div class="pill-row">
            <span class="meta">⏱ ${r.time}</span>
            <span class="meta">🔥 ${r.kcal} kcal</span>
            <span class="meta">👥 ${r.servings}</span>
          </div>
          <button class="btn pill" data-id="${r.id}" aria-label="View ${r.title}">View</button>
        </div>`;
      card.querySelector('button').addEventListener('click', ()=> openRecipe(r.id));
      wrap.appendChild(card);
    });
  }
  $('#start-quiz').addEventListener('click', ()=> startQuiz());
  
  /* ---------- Quiz ---------- */
  const questions = [
    { q:"What are you in the mood for?", a:["Comfort food 🍲","Something light 🥗","Quick snack 🥪","Sweet treat 🍰"] },
    { q:"How much time do you want to spend?", a:["10 minutes or less","20–30 minutes","1–2 hours","I don’t mind cooking longer"] },
    { q:"Use what’s at home or shop?", a:["Use what I have","Open to buying a few things"] },
    { q:"Any preferences today?", a:["Vegetarian","Vegan","High protein","No preference"] },
    { q:"Who’s eating?", a:["Just me","Me + family/friends","Meal prep for later"] },
    { q:"What flavor are you craving?", a:["Savory","Spicy","Fresh & zesty","Sweet"] },
    { q:"Do you want your meal to be…", a:["Low calorie","Balanced & healthy","Rich","Cheat meal"] },
  ];
  let qIndex = 0;
  const answers = new Array(questions.length).fill(null);
  
  function startQuiz(){ qIndex = 0; renderQuestion(); show('quiz'); }
  function renderQuestion(){
    $('#q-title').textContent = questions[qIndex].q;
    const opts = $('#q-options'); opts.innerHTML = '';
    questions[qIndex].a.forEach((label, i)=>{
      const row = document.createElement('label');
      row.className = 'option';
      row.innerHTML = `<input type="radio" name="q${qIndex}" ${answers[qIndex]===i?'checked':''}/> <span>${label}</span>`;
      row.querySelector('input').addEventListener('change', ()=>answers[qIndex]=i);
      opts.appendChild(row);
    });
    const pct = (qIndex/(questions.length-1))*100;
    $('#q-progress').style.width = `${Math.max(0,Math.min(100,pct))}%`;
    $('#q-prev').disabled = qIndex===0;
  }
  $('#q-next').addEventListener('click', ()=>{
    if (answers[qIndex]===null) { shake($('#q-options')); return; }
    if (qIndex < questions.length-1){ qIndex++; renderQuestion(); }
    else {
      $('#q-progress').style.width = '100%';
      const usePantry = answers[2] === 0; // Q3
      if (usePantry){ renderPantry(); show('pantry'); }
      else { show('loading'); setTimeout(()=>{ renderSwipe(); show('swipe'); }, 700); }
    }
  });
  $('#q-prev').addEventListener('click', ()=>{ if(qIndex>0){ qIndex--; renderQuestion(); }});
  function shake(el){ el.animate([{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],{duration:250}); }
  
  /* ---------- Swipe ---------- */
  let chosen = null;
  const likedPicks = []; // session likes
  
  function renderSwipe(){
    const deck = $('#card-deck'); deck.innerHTML = '';
    [...swipeMeals].reverse().forEach((m, idx)=>{
      const card = document.createElement('div');
      card.className = 'swipe-card';
      card.dataset.id = m.id;
      card.style.zIndex = 10+idx;
      card.innerHTML = `
        <img class="swipe-cover" src="${m.img}" alt="${m.title}" onerror="this.style.background='#ddd'; this.src='';">
        <div class="swipe-body">
          <h3>${m.title}</h3>
          <div class="pill-row">
            <span class="meta">⏱ ${m.time}</span>
            <span class="meta">🔥 ${m.kcal}</span>
            <span class="meta">👥 ${m.servings}</span>
          </div>
        </div>`;
      addSwipe(card, () => like(m), () => pass());
      deck.appendChild(card);
    });
    chosen = swipeMeals[0];
  }
  function like(m){ chosen = m; if (!likedPicks.find(x=>x.id===m.id)) likedPicks.push(m); showToast(`Liked: ${m.title}`); }
  function pass(){ showToast('Passed'); }
  
  const topCard = () => document.querySelector('.deck .swipe-card:last-child');
  const mealFromCard = (el) => el ? swipeMeals.find(m => m.id === el.dataset.id) : null;
  
  $('#like-btn').addEventListener('click', ()=>{
    const el = topCard(); if (!el) return;
    const m = mealFromCard(el); if (m) like(m);
    el.style.transform='translateX(500px) rotate(12deg)';
    setTimeout(()=> { el.remove(); maybeEndSwiping(); }, 180);
  });
  $('#pass-btn').addEventListener('click', ()=>{
    const el = topCard(); if (!el) return;
    pass();
    el.style.transform='translateX(-500px) rotate(-12deg)';
    setTimeout(()=> { el.remove(); maybeEndSwiping(); }, 180);
  });
  document.getElementById('see-liked')?.addEventListener('click', ()=>{ renderLiked(); show('liked'); });
  
  function maybeEndSwiping(){
    const hasCards = document.querySelectorAll('.deck .swipe-card').length > 0;
    if (!hasCards) { renderLiked(); show('liked'); }
  }
  
  /* drag to swipe */
  function addSwipe(el, onRight, onLeft){
    let startX=0, startY=0, currentX=0, dragging=false;
    const start = (x,y,ev)=>{ dragging=true; startX=x; startY=y; currentX=x; el.classList.add('dragging'); el.style.willChange='transform'; ev?.preventDefault?.(); };
    const move  = (x,y)=>{ if(!dragging) return; const dx=x-startX, dy=y-startY; if (Math.abs(dy)>Math.abs(dx)) return; el.style.transform=`translate3d(${dx}px,0,0) rotate(${dx/20}deg)`; currentX=x; };
    const end   = ()=>{ if(!dragging) return; dragging=false; el.classList.remove('dragging'); const dx=currentX-startX, abs=Math.abs(dx);
      if (abs>80){ el.style.transition='transform .2s ease'; el.style.transform=`translate3d(${dx>0?500:-500}px,0,0) rotate(${dx>0?12:-12}deg)`;
        setTimeout(()=>{ el.remove(); dx>0?onRight():onLeft(); maybeEndSwiping(); },180);
      } else { el.style.transition='transform .18s ease'; el.style.transform='translate3d(0,0,0)'; setTimeout(()=>{ el.style.transition=''; el.style.willChange=''; },180); } };
    el.addEventListener('pointerdown', e=>{ el.setPointerCapture?.(e.pointerId); start(e.clientX,e.clientY,e); });
    el.addEventListener('pointermove', e=> move(e.clientX,e.clientY));
    ['pointerup','pointercancel','lostpointercapture'].forEach(t=>el.addEventListener(t,end));
    el.addEventListener('touchstart', e=>{ const t=e.touches[0]; start(t.clientX,t.clientY,e); }, {passive:false});
    el.addEventListener('touchmove',  e=>{ const t=e.touches[0]; move(t.clientX,t.clientY); }, {passive:false});
    el.addEventListener('touchend', end);
    el.addEventListener('mousedown', e=> start(e.clientX,e.clientY,e));
    window.addEventListener('mousemove', e=>{ if(dragging) move(e.clientX,e.clientY); });
    window.addEventListener('mouseup', end);
  }
  
  /* ---------- Liked page ---------- */
  function renderLiked(){
    const list = $('#liked-list'); list.innerHTML = '';
    if (!likedPicks.length){
      list.innerHTML = `<div class="load-card"><p class="muted">No liked meals yet. Swipe “Like” to add some.</p></div>`;
      return;
    }
    likedPicks.forEach(m=>{
      const row = document.createElement('div'); row.className='like-item';
      row.innerHTML = `
        <img src="${m.img}" alt="${m.title}" onerror="this.style.background='#ddd'; this.src='';">
        <div class="grow">
          <div class="title">${m.title}</div>
          <div class="pill-row">
            <span class="meta">⏱ ${m.time}</span>
            <span class="meta">🔥 ${m.kcal}</span>
            <span class="meta">👥 ${m.servings}</span>
          </div>
        </div>
        <button class="btn primary" aria-label="Start ${m.title}">Start</button>`;
      row.querySelector('button').addEventListener('click', ()=> openRecipe(m.id));
      list.appendChild(row);
    });
  }
  
  /* ---------- Pantry page ---------- */
  function renderPantry(){
    const chips = $('#pantry-chips'); const input = $('#pantry-input'); chips.innerHTML='';
    const items = load(LS.pantry, []); items.forEach(addChip);
    function addChipText(txt){ const t=txt.trim().toLowerCase(); if(!t) return; const list=load(LS.pantry,[]); if(!list.includes(t)){ list.push(t); save(LS.pantry,list); addChip(t); } input.value=''; input.focus(); }
    function addChip(name){
      const chip = document.createElement('div'); chip.className='pantry-chip';
      chip.innerHTML = `<span>${name}</span><button aria-label="Remove ${name}">×</button>`;
      chip.querySelector('button').addEventListener('click', ()=>{ const list=load(LS.pantry,[]).filter(x=>x!==name); save(LS.pantry,list); chip.remove(); });
      chips.appendChild(chip);
    }
    $('#pantry-add').onclick = ()=> addChipText(input.value);
    input.onkeydown = (e)=>{ if(e.key==='Enter') addChipText(input.value); };
    $('#pantry-clear').onclick = ()=>{ save(LS.pantry, []); chips.innerHTML=''; };
    $('#pantry-find').onclick = ()=>{
      const have = load(LS.pantry, []);
      const results = Object.entries(recipeById).map(([id,r])=>{
        const rItems = r.ingredients.map(i=>i.item.toLowerCase());
        const match = have.filter(h => rItems.some(ri=>ri.includes(h) || h.includes(ri)));
        const score = Math.round((match.length / r.ingredients.length) * 100);
        return {id, title:r.title, img:r.img, time:r.time, kcal:r.kcal, score};
      }).sort((a,b)=>b.score-a.score);
      const out = $('#pantry-results'); out.innerHTML='';
      results.forEach(x=>{
        const row = document.createElement('div'); row.className='like-item';
        row.innerHTML = `
          <img src="${x.img}" alt="${x.title}">
          <div class="grow">
            <div class="title">${x.title}</div>
            <div class="pill-row">
              <span class="meta">Match ${x.score}%</span>
              <span class="meta">⏱ ${x.time}</span>
              <span class="meta">🔥 ${x.kcal}</span>
            </div>
          </div>
          <button class="btn primary">Start</button>`;
        row.querySelector('button').addEventListener('click', ()=> openRecipe(x.id));
        out.appendChild(row);
      });
      if (!results.length){ out.innerHTML = `<div class="load-card"><p class="muted">No matches yet. Add a few staples like rice, onion, garlic.</p></div>`; }
    };
  }
  
  /* ---------- Shopping list page ---------- */
  function renderShopping(){
    const box = $('#shopping-list'); box.innerHTML='';
    const items = load(LS.shopping, []);
    if (!items.length){
      box.innerHTML = `<div class="load-card"><p class="muted">Your shopping list is empty.</p></div>`;
    } else {
      items.forEach((txt,i)=>{
        const row = document.createElement('label');
        row.className='check';
        row.innerHTML = `<input type="checkbox" data-i="${i}"> <span>${txt}</span>`;
        box.appendChild(row);
      });
    }
    $('#shopping-clear').onclick = ()=>{
      const checks = [...box.querySelectorAll('input[type="checkbox"]:checked')].map(cb=>+cb.dataset.i);
      if (!checks.length) { showToast('No items checked'); return; }
      const arr = load(LS.shopping, []);
      const keep = arr.filter((_,i)=>!checks.includes(i));
      save(LS.shopping, keep);
      renderShopping();
      showToast('Removed checked items');
    };
    $('#shopping-save').onclick = ()=> showToast('Saved for later'); // persisted already
    $('#shopping-copy').onclick = async ()=>{
      const arr = load(LS.shopping, []);
      const txt = arr.join('\n');
      try { await navigator.clipboard.writeText(txt); showToast('Copied to clipboard'); }
      catch { showToast('Copy failed'); }
    };
  }
  
  /* ---------- Recipe ---------- */
  let currentRecipe = null;
  let servings = 2;
  let lastScreenBeforeRecipe = 'liked';
  
  function openRecipe(id){
    const r = recipeById[id] || recipeById["teriyaki-chicken-rice"];
    currentRecipe = r;
    servings = r.baseServings ?? 2;
  
    $('#recipe-hero').innerHTML = `<img src="${r.img}" alt="${r.title}" onerror="this.style.background='#ddd'; this.src='';"><h2>${r.title}</h2>`;
    $('#meta-time').textContent = r.time;
    $('#meta-kcal').textContent = r.kcal;
    $('#meta-servings').textContent = servings;
  
    renderIngredients();
    renderSteps();
  
    $$('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelector('[data-tab="ingredients"]').classList.add('active');
    $('#tab-ingredients').classList.remove('hidden');
    $('#tab-steps').classList.add('hidden');
  
    lastScreenBeforeRecipe = currentScreen;
    show('recipe');
  }
  
  function scale(q){ const base = currentRecipe.baseServings || 2; return +(q * (servings / base)).toFixed(2); }
  function renderIngredients(){
    const box = $('#ingredients-list'); box.innerHTML='';
    currentRecipe.ingredients.forEach(it=>{
      const hasQty = typeof it.qty === 'number';
      const label = hasQty ? `${scale(it.qty)} ${it.unit} ${it.item}` : it.item;
      const row = document.createElement('label');
      row.className='check';
      row.innerHTML = `<input type="checkbox"> <span>${label}</span>`;
      box.appendChild(row);
    });
    $('#servings').textContent = servings;
    $('#meta-servings').textContent = servings;
  }
  function renderSteps(){
    const box = $('#steps-list'); box.innerHTML='';
    currentRecipe.steps.forEach((t,i)=>{
      const row = document.createElement('label');      /* ✅ changed from div to label */
      row.className='cookstep check';                   /* ✅ add check styling */
      row.innerHTML = `
        <input type="checkbox" data-step="${i}"> 
        <span><strong>Step ${i+1}:</strong> ${t}</span>
      `;
      box.appendChild(row);
    });
  
    /* ✅ NEW: Add Finish button at end */
    const doneBtn = document.createElement('button');
    doneBtn.textContent = "Finish Recipe";
    doneBtn.className = "btn primary";
    doneBtn.style.marginTop = "1rem";
// tap "Finish Recipe" → confetti + go Home
doneBtn.addEventListener('click', () => {
    showToast("Recipe complete! 🎉");
    try { launchConfetti(); } catch(e) {}
    setTimeout(() => { show('home'); }, 900);  // quick celebration, then Home
  });
  
    box.appendChild(doneBtn);
  }
  
  
  $('#servings-inc').addEventListener('click', ()=>{ servings++; renderIngredients(); });
  $('#servings-dec').addEventListener('click', ()=>{ servings=Math.max(1,servings-1); renderIngredients(); });
  $('#recipe-back').addEventListener('click', ()=> show(lastScreenBeforeRecipe));
  
  /* Ingredients → Shopping */

  $('#shop-back').addEventListener('click', ()=>{
    show('recipe');
    document.querySelector('[data-tab="ingredients"]').click();
  });
  
  /* Tabs */
  $$('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      $$('.tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      $('#tab-ingredients').classList.toggle('hidden', tab!=='ingredients');
      $('#tab-steps').classList.toggle('hidden', tab!=='steps');
    });
  });
  
  /* Favorites */
  function setFavIcon(on){ $('#fav-icon').setAttribute('fill', on ? 'currentColor' : 'none'); }
  $('#fav-btn').addEventListener('click', ()=>{
    if (!currentRecipe) return;
    const id = Object.keys(recipeById).find(k=>recipeById[k]===currentRecipe);
    const favs = new Set(load(LS.favorites, []));
    if (favs.has(id)){ favs.delete(id); showToast('Removed from favorites'); }
    else { favs.add(id); showToast('Added to favorites'); }
    save(LS.favorites, [...favs]);
    setFavIcon(favs.has(id));
  });
  
  /* Save to liked */
  $('#save-btn').addEventListener('click', ()=>{
    if (!currentRecipe) return;
    const id = Object.keys(recipeById).find(k=>recipeById[k]===currentRecipe);
    const exists = likedPicks.find(x=>x.id===id);
    if (!exists){
      likedPicks.push({ id, title: currentRecipe.title, time: currentRecipe.time, kcal: currentRecipe.kcal, servings: currentRecipe.baseServings, img: currentRecipe.img });
      showToast('Saved to liked');
    } else { showToast('Already in liked'); }
  });
  
  /* Add missing to shopping */
  $('#add-missing-btn').addEventListener('click', ()=>{
    if (!currentRecipe) return;
    const rows = Array.from(document.querySelectorAll('#ingredients-list .check'));
    const missing = rows.filter(r=>!r.querySelector('input').checked).map(r=>r.textContent.trim());
    if (!missing.length){ showToast('Nice — you have everything!'); return; }
    const list = load(LS.shopping, []);
    missing.forEach(x=>{ if (!list.includes(x)) list.push(x); });
    save(LS.shopping, list);
    showToast(`${missing.length} item(s) added to shopping list`);
  });
  $('#go-shopping-btn').addEventListener('click', ()=>{
    lastScreenBeforeRecipe = 'recipe';   // remember we came from recipe
    renderShopping();
    show('shopping');
  });  

  // Back from shopping → return to recipe Ingredients tab
$('#shopping-back').addEventListener('click', ()=>{
    show('recipe');
    document.querySelector('[data-tab="ingredients"]').click();
  });
  
  /* ---------- Cooking Mode ---------- */
  let wakeLock = null;
  let activeStep = 0;
  const speak = (txt) => { try { const u=new SpeechSynthesisUtterance(txt); speechSynthesis.cancel(); speechSynthesis.speak(u); } catch{} };
  async function requestWakeLock(){ try{ if('wakeLock' in navigator){ wakeLock = await navigator.wakeLock.request('screen'); } }catch{} }
  function releaseWakeLock(){ try{ wakeLock && wakeLock.release(); }catch{} wakeLock=null; }
  const updateActiveStepUI = ()=>{
    const steps = $$('#steps-list .cookstep');
    steps.forEach((el,i)=> el.classList.toggle('active', i===activeStep));
    if (steps[activeStep]) steps[activeStep].scrollIntoView({behavior:'smooth', block:'center'});
  };
  
  /* Light cooking mode handler (NO dark UI) */
  $('#cookmode').addEventListener('change', async (e)=>{
    const on = e.target.checked;
    document.body.classList.toggle('cook', on);
    $('#cook-controls')?.classList.toggle('hidden', !on);
    $('#steps-nav')?.classList.toggle('hidden', on);
    if (on){
      activeStep = 0; updateActiveStepUI();
      await requestWakeLock();
    } else {
      releaseWakeLock();
    }
  });
  
  $('#step-prev').addEventListener('click', ()=>{ activeStep = Math.max(0, activeStep-1); updateActiveStepUI(); });
  $('#step-next').addEventListener('click', ()=>{
    const last = $$('#steps-list .cookstep').length - 1;
    if (activeStep < last){ activeStep++; updateActiveStepUI(); }
    else { finishCooking(); }
  });
  $('#speak-step').addEventListener('click', ()=>{
    const el = $$('#steps-list .cookstep')[activeStep];
    if (el) speak(el.textContent.replace(/^Step \d+:/,'').trim());
  });
  document.addEventListener('visibilitychange', ()=>{ if (document.visibilityState==='visible' && $('#cookmode').checked) requestWakeLock(); });
  
  /* standard steps nav */
  $('#steps-prev').addEventListener('click', ()=> document.querySelector('[data-tab="ingredients"]').click());
  $('#steps-finish').addEventListener('click', finishCooking);
  
  /* ---------- Finish / Celebration ---------- */
  function finishCooking(){
    const r = currentRecipe || {};
    $('#done-title').textContent = `${r.title || 'All done'} — enjoy! 🎉`;
    $('#done-tip').textContent = (r.tips && r.tips[0]) || 'Tip: plate neatly and add something fresh for brightness.';
    const reco = $('#done-reco'); reco.innerHTML='';
    (r.recos || []).forEach(name=>{
      const id = Object.keys(recipeById).find(k=>recipeById[k].title===name);
      if (!id) return;
      const rr = recipeById[id];
      const btn = document.createElement('button');
      btn.className='btn pill';
      btn.textContent = `Try next: ${rr.title}`;
      btn.addEventListener('click', ()=> openRecipe(id));
      reco.appendChild(btn);
    });
    show('done'); launchConfetti();
  }
  $('#done-again').addEventListener('click', ()=>{ if(currentRecipe){ openRecipe(Object.keys(recipeById).find(k=>recipeById[k]===currentRecipe)); }});
  $('#done-share').addEventListener('click', async ()=>{
    if (!currentRecipe) return;
    const text = `I just cooked ${currentRecipe.title} with Plateful!`;
    try { if (navigator.share) await navigator.share({ title:'Plateful', text }); else { await navigator.clipboard.writeText(text); showToast('Copied to clipboard'); } } catch {}
  });
  
  function launchConfetti(){
    const c = $('#confetti'); const ctx = c.getContext('2d');
    const W = c.width = window.innerWidth; const H = c.height = window.innerHeight;
    const pieces = Array.from({length:120}, ()=>({ x: Math.random()*W, y: -20-Math.random()*H, r: 4+Math.random()*6, vy: 2+Math.random()*3, vx: -1+Math.random()*2, a: Math.random()*Math.PI }));
    let t=0, raf;
    const draw = ()=>{
      ctx.clearRect(0,0,W,H);
      pieces.forEach(p=>{
        p.y+=p.vy; p.x+=p.vx; p.a+=0.05;
        ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.a);
        ctx.fillStyle = `hsl(${(p.y/3+t)%360}, 90%, 60%)`;
        ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r);
        ctx.restore();
      });
      t+=2; if (t<600) raf=requestAnimationFrame(draw); else cancelAnimationFrame(raf);
    };
    draw();
  }
  
  /* ---------- Keyboard helpers ---------- */
  document.addEventListener('keydown', (e)=>{
    if (!$('#swipe').classList.contains('hidden')){
      if (e.key==='ArrowLeft') $('#pass-btn').click();
      if (e.key==='ArrowRight') $('#like-btn').click();
    }
  });
  

// --- Nuclear remover for stray yellow "+" / Next FABs ---
(function killPlusForever(){
    const selectors = [
      '#step-next',
      '.fab',
      'button[aria-label="Next"]',
      'button[aria-label="Next ▶"]'
    ];
  
    function looksLikeFloatingFab(btn){
      try {
        const cs = getComputedStyle(btn);
        const w = btn.offsetWidth;
        const h = btn.offsetHeight;
        const txt = (btn.textContent || '').trim();
        const isBig = Math.max(w, h) >= 48;                 // bigger than tiny + in servings
        const isFloating = cs.position === 'fixed' || cs.position === 'sticky' || cs.position === 'absolute';
        const isPlusLike = txt === '+' || txt === 'Next' || txt === 'Next ▶';
        const hasPrimary = btn.classList.contains('primary');
        return (isBig && isFloating && isPlusLike) || (btn.id === 'step-next') || hasPrimary && isPlusLike;
      } catch { return false; }
    }
  
    function removeAll(){
      // Remove by selectors
      document.querySelectorAll(selectors.join(',')).forEach(el => el.remove());
      // Heuristic removal
      document.querySelectorAll('button').forEach(btn=>{
        if (looksLikeFloatingFab(btn)) btn.remove();
      });
    }
  
    // Run now, on load, and for late inserts
    removeAll();
    window.addEventListener('load', removeAll);
    setTimeout(removeAll, 400);
    setInterval(removeAll, 800);
  
    // Also watch DOM changes
    const mo = new MutationObserver(removeAll);
    mo.observe(document.body, { childList: true, subtree: true });
  })();
  