// 靜宜資管島 — 3D 六角群島導覽（Three.js，無須打包）
import * as THREE from "./vendor/three/three.module.min.js";
import { OrbitControls } from "./vendor/three/addons/OrbitControls.js";
import { CSS2DRenderer, CSS2DObject } from "./vendor/three/addons/CSS2DRenderer.js";
import { RoundedBoxGeometry } from "./vendor/three/addons/RoundedBoxGeometry.js";
import { ISLANDS, LINKS, STAGES, SOURCES, META } from "./data.js";

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const BY_ID = Object.fromEntries(ISLANDS.map((i) => [i.id, i]));
const ITEM_ISLAND = {};
let view = "3d";
ISLANDS.forEach((isl) => isl.items.forEach((it) => (ITEM_ISLAND[it.id] = isl)));

// ---------- 版面：六角格座標 ----------
const SP = 9.5; // 格距
const AXIAL = [
  [0, 0],
  [1, 0], [1, -1], [0, -1], [-1, 0], [-1, 1], [0, 1],
  [2, -1], [1, -2], [-1, -1], [-2, 1], [-1, 2], [1, 1],
];
// 中心：系務；第一圈：目標、新生、四學程；第二圈：實驗室、師資、專題、實習、證照、出路
const ORDER = ["core", "p-ai", "p-soft", "goals", "fresh", "p-erp", "p-data", "labs", "faculty", "future", "cert", "industry", "capstone"];
const POS = {};
ORDER.forEach((id, k) => {
  const [q, r] = AXIAL[k];
  POS[id] = new THREE.Vector3(SP * Math.sqrt(3) * (q + r / 2), 0, SP * 1.5 * r);
});
// 將群島置中
const box = new THREE.Box3().setFromPoints(Object.values(POS));
const ctr = box.getCenter(new THREE.Vector3());
Object.values(POS).forEach((p) => p.sub(ctr).setY(0));

// ---------- 場景 ----------
const host = $("#stage3d");
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcfe9f7, 70, 160);
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 500);
camera.position.set(0, 66, 74);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
host.appendChild(renderer.domElement);
const labelRenderer = new CSS2DRenderer();
labelRenderer.domElement.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:1;overflow:hidden";
host.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.45;
controls.minDistance = 14;
controls.maxDistance = 120;

scene.add(new THREE.HemisphereLight(0xffffff, 0x7fb3d5, 1.1));
const sun = new THREE.DirectionalLight(0xffffff, 1.6);
sun.position.set(30, 50, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -50, right: 50, top: 50, bottom: -50 });
scene.add(sun);

// 海面（輕微波動）
const seaGeo = new THREE.PlaneGeometry(220, 220, 60, 60);
seaGeo.rotateX(-Math.PI / 2);
const sea = new THREE.Mesh(seaGeo, new THREE.MeshStandardMaterial({ color: 0x7fc4e8, roughness: 0.35, metalness: 0.05, flatShading: true }));
sea.position.y = -0.9;
sea.receiveShadow = true;
scene.add(sea);
const seaBase = seaGeo.attributes.position.array.slice();

// ---------- 島嶼與建築 ----------
const pickables = [];
const islandObjs = {}; // id -> { group, label, buildings: [{mesh, item}] }
const tmpColor = new THREE.Color();

function shade(hex, l) { return tmpColor.set(hex).offsetHSL(0, -0.05, l).getHex(); }

function sunflower(n, radius) {
  if (n === 1) return [[0, 0]];
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const r = radius * Math.sqrt((i + 0.6) / n);
    pts.push([Math.cos(i * golden) * r, Math.sin(i * golden) * r]);
  }
  return pts;
}

function makeBuilding(isl, item, idx) {
  const g = new THREE.Group();
  const h = 1.3 + ((idx * 37) % 10) / 10 * 1.8 + (isl.kind === "hub" ? 1 : 0);
  const mat = new THREE.MeshStandardMaterial({ color: shade(isl.color, 0.18), roughness: 0.6, transparent: true });
  const roofMat = new THREE.MeshStandardMaterial({ color: isl.color, roughness: 0.5, transparent: true });
  let body, roof;
  if (isl.kind === "faculty") {
    body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 1.4, 16), mat);
    body.position.y = 0.7;
    roof = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 12), roofMat);
    roof.position.y = 1.75;
  } else if (isl.kind === "program") {
    body = new THREE.Mesh(new RoundedBoxGeometry(1.4, h + 1, 1.4, 3, 0.15), mat);
    body.position.y = (h + 1) / 2;
    roof = new THREE.Mesh(new THREE.ConeGeometry(0.95, 0.9, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = h + 1 + 0.45;
  } else {
    body = new THREE.Mesh(new RoundedBoxGeometry(1.7, h, 1.5, 3, 0.18), mat);
    body.position.y = h / 2;
    roof = new THREE.Mesh(new RoundedBoxGeometry(1.9, 0.25, 1.7, 2, 0.08), roofMat);
    roof.position.y = h + 0.12;
  }
  // 窗戶帶
  const win = new THREE.Mesh(new THREE.BoxGeometry(isl.kind === "faculty" ? 0.5 : 1.42, 0.16, isl.kind === "faculty" ? 0.9 : 1.52),
    new THREE.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffd76a, emissiveIntensity: 0.25, transparent: true }));
  win.position.y = isl.kind === "faculty" ? 1.05 : Math.max(0.7, body.position.y);
  [body, roof, win].forEach((m) => { m.castShadow = true; m.userData = { item, island: isl }; g.add(m); pickables.push(m); });
  g.userData.mats = [mat, roofMat, win.material];
  return g;
}

ISLANDS.forEach((isl) => {
  const group = new THREE.Group();
  group.position.copy(POS[isl.id]);
  const R = isl.items.length > 8 ? 6.6 : 5.6;
  // 六角島：沙灘層 + 草地層
  const sand = new THREE.Mesh(new THREE.CylinderGeometry(R + 0.6, R + 1.0, 1.2, 6), new THREE.MeshStandardMaterial({ color: 0xf1dfb0, roughness: 0.9, flatShading: true }));
  sand.position.y = -0.4;
  const grass = new THREE.Mesh(new THREE.CylinderGeometry(R, R + 0.3, 0.5, 6), new THREE.MeshStandardMaterial({ color: shade(isl.color, 0.36), roughness: 0.85, flatShading: true }));
  grass.position.y = 0.2;
  [sand, grass].forEach((m) => { m.rotation.y = Math.PI / 6; m.receiveShadow = true; m.userData = { island: isl }; group.add(m); pickables.push(m); });

  const pts = sunflower(isl.items.length, R - 1.5);
  const buildings = isl.items.map((item, i) => {
    const b = makeBuilding(isl, item, i);
    b.position.set(pts[i][0], 0.45, pts[i][1]);
    b.rotation.y = ((i * 53) % 90) * Math.PI / 180;
    group.add(b);
    return { mesh: b, item };
  });

  // 島名標籤
  const el = document.createElement("button");
  el.className = "isl-label";
  el.style.setProperty("--c", isl.color);
  el.textContent = `${isl.icon} ${isl.name}`;
  el.addEventListener("click", (e) => { e.stopPropagation(); selectIsland(isl.id); });
  const label = new CSS2DObject(el);
  label.position.set(0, 5.2, 0);
  group.add(label);

  scene.add(group);
  islandObjs[isl.id] = { group, label: el, buildings, R };
});

// 島際連線（拱橋弧線 + 流動光點）
const flows = [];
LINKS.forEach(([a, b]) => {
  const pa = POS[a].clone().setY(0.6), pb = POS[b].clone().setY(0.6);
  const mid = pa.clone().lerp(pb, 0.5).setY(4 + pa.distanceTo(pb) * 0.12);
  const curve = new THREE.QuadraticBezierCurve3(pa, mid, pb);
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, 0.07, 6, false),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 }));
  scene.add(tube);
  const dot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), new THREE.MeshBasicMaterial({ color: 0xf2b705 }));
  scene.add(dot);
  flows.push({ curve, dot, t: Math.random(), a, b, tube });
});

// ---------- 互動：點擊 / 滑過 ----------
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let downAt = null;
const tip = document.createElement("div");
tip.style.cssText = "position:absolute;pointer-events:none;background:#1A202C;color:#fff;font-size:12px;padding:4px 8px;border-radius:6px;white-space:nowrap;display:none;z-index:4";
host.appendChild(tip);

function pick(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(pickables, false)[0];
  return hit ? hit.object.userData : null;
}
renderer.domElement.addEventListener("pointerdown", (e) => (downAt = [e.clientX, e.clientY]));
renderer.domElement.addEventListener("pointerup", (e) => {
  if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
  const d = pick(e);
  if (!d) return;
  if (d.item) selectItem(d.item.id); else selectIsland(d.island.id);
});
renderer.domElement.addEventListener("pointermove", (e) => {
  const d = pick(e);
  renderer.domElement.style.cursor = d ? "pointer" : "grab";
  if (d && d.item) {
    const r = host.getBoundingClientRect();
    tip.textContent = d.item.name;
    tip.style.left = e.clientX - r.left + 12 + "px";
    tip.style.top = e.clientY - r.top + 12 + "px";
    tip.style.display = "block";
  } else tip.style.display = "none";
});

// ---------- 鏡頭飛行 ----------
let fly = null;
function flyTo(target, dist = 26) {
  const dir = camera.position.clone().sub(controls.target).normalize();
  if (dir.y < 0.5) dir.setY(0.75).normalize();
  fly = { t: 0, p0: camera.position.clone(), t0: controls.target.clone(), p1: target.clone().add(dir.multiplyScalar(dist)), t1: target.clone() };
}
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// ---------- 學年篩選 ----------
let stage = null;
function applyStage() {
  ISLANDS.forEach((isl) => {
    const o = islandObjs[isl.id];
    let any = false;
    o.buildings.forEach(({ mesh, item }) => {
      const on = !stage || (item.stages || []).includes(stage);
      any ||= on;
      mesh.userData.mats.forEach((m) => (m.opacity = on ? 1 : 0.18));
      mesh.userData.target = on ? 1 : 0.55;
    });
    o.label.classList.toggle("dim", !any);
  });
  document.querySelectorAll("#stageChips .chip").forEach((c) => c.classList.toggle("on", c.dataset.s === (stage || "")));
}
const chips = $("#stageChips");
[{ id: "", label: "全部" }, ...STAGES].forEach((s) => {
  const b = document.createElement("button");
  b.className = "chip";
  b.dataset.s = s.id;
  b.textContent = s.label;
  b.title = s.note || "";
  b.addEventListener("click", () => { stage = s.id || null; applyStage(); });
  chips.appendChild(b);
});

// ---------- 側欄 ----------
const panel = $("#panel");
let current = null;

function srcLink(key) {
  const s = SOURCES[key];
  return s ? `<a class="src" href="${esc(s.url)}" target="_blank" rel="noopener">來源：${esc(s.label)} ↗</a>` : "";
}
function stageTags(it) {
  return (it.stages || []).map((s) => `<span class="tag">${esc(STAGES.find((x) => x.id === s)?.label || s)}</span>`).join("");
}

function renderHome() {
  current = null;
  Object.values(islandObjs).forEach((o) => o.label.classList.remove("sel"));
  const total = ISLANDS.reduce((n, i) => n + i.items.length, 0);
  panel.innerHTML = `
    <h2>🧭 ${esc(META.dept)}</h2>
    <p class="sum">${esc(META.tagline)}<br>共 ${ISLANDS.length} 座主題島、${total} 棟資訊建築。點選島嶼開始探索，或用上方「依學年亮起」看看每個階段該去哪裡。</p>
    <ul class="isl-list">${ISLANDS.map((i) => `<li><button data-isl="${i.id}" style="--c:${i.color}">${i.icon} ${esc(i.name)}<span class="n">${i.items.length} 棟</span></button></li>`).join("")}</ul>
    <div class="contact">📍 ${esc(META.address)}<br>☎ ${esc(META.phone)}<br>✉ ${esc(META.email)}<br>
      ${META.social.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("・")}</div>`;
  panel.querySelectorAll("[data-isl]").forEach((b) => b.addEventListener("click", () => selectIsland(b.dataset.isl)));
  panel.scrollTop = 0;
}

function renderIsland(isl, focusItem) {
  current = isl.id;
  Object.entries(islandObjs).forEach(([id, o]) => o.label.classList.toggle("sel", id === isl.id));
  panel.innerHTML = `
    <button class="back" id="back">← 全部島嶼</button>
    <h2>${isl.icon} ${esc(isl.name)}</h2>
    <p class="sum">${esc(isl.summary)}</p>
    ${isl.items.map((it) => `
      <article class="card" id="card-${it.id}" style="--c:${isl.color}">
        <h3>${esc(it.name)}</h3>
        <ul>${it.facts.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>
        <div class="meta">${stageTags(it)}${it.link ? `<a class="src" href="${esc(it.link)}" target="_blank" rel="noopener">連結 ↗</a>` : ""} ${srcLink(it.src)}</div>
      </article>`).join("")}`;
  $("#back").addEventListener("click", () => { location.hash = ""; renderHome(); flyTo(new THREE.Vector3(0, 0, 0), 80); });
  if (focusItem) {
    const c = document.getElementById("card-" + focusItem);
    if (c) { c.classList.add("hl"); c.scrollIntoView({ block: "start", behavior: "smooth" }); }
  } else panel.scrollTop = 0;
}

function selectIsland(id, focusItem) {
  const isl = BY_ID[id];
  if (!isl) return;
  if (view !== "3d") setView("3d");
  renderIsland(isl, focusItem);
  flyTo(POS[id], isl.items.length > 8 ? 30 : 24);
  history.replaceState(null, "", "#" + (focusItem || id));
}
function selectItem(itemId) {
  const isl = ITEM_ISLAND[itemId];
  if (isl) selectIsland(isl.id, itemId);
}

// ---------- 搜尋 ----------
const q = $("#q"), results = $("#results");
const INDEX = ISLANDS.flatMap((isl) => isl.items.map((it) => ({ it, isl, text: [isl.name, it.name, ...it.facts].join(" ").toLowerCase() })));
q.addEventListener("input", () => {
  const terms = q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) { results.hidden = true; return; }
  const hits = INDEX.filter((x) => terms.every((t) => x.text.includes(t))).slice(0, 30);
  results.innerHTML = hits.length
    ? hits.map((h) => `<button data-item="${h.it.id}">${h.isl.icon} ${esc(h.it.name)} <small>— ${esc(h.isl.name)}</small></button>`).join("")
    : `<p style="padding:8px 10px;margin:0;color:#5A6577">找不到「${esc(q.value)}」</p>`;
  results.hidden = false;
  results.querySelectorAll("[data-item]").forEach((b) => b.addEventListener("click", () => { results.hidden = true; selectItem(b.dataset.item); }));
});
q.addEventListener("keydown", (e) => { if (e.key === "Escape") { q.value = ""; results.hidden = true; } if (e.key === "Enter") results.querySelector("button")?.click(); });

// ---------- 學習路徑（2D） ----------
const pathEl = $("#path");
function renderPath() {
  pathEl.innerHTML = `<h2>🧭 學習路徑：大一到碩士班</h2>
    <p>依官網內容整理各階段可以去的島嶼與資源。點任一張卡片可回到 3D 地圖對應位置。</p>
    <div class="cols">${STAGES.map((s) => {
      const items = INDEX.filter((x) => (x.it.stages || []).includes(s.id));
      return `<section class="col"><h3>${esc(s.label)}</h3><div class="note">${esc(s.note)}</div>
        ${items.map((x) => `<button class="pitem" style="--c:${x.isl.color}" data-item="${x.it.id}">${esc(x.it.name)}<small>${x.isl.icon} ${esc(x.isl.name)}</small></button>`).join("")}</section>`;
    }).join("")}</div>`;
  pathEl.querySelectorAll("[data-item]").forEach((b) => b.addEventListener("click", () => selectItem(b.dataset.item)));
}
function setView(v) {
  view = v;
  $("#map").hidden = v !== "3d";
  pathEl.hidden = v !== "2d";
  $("#v3d").classList.toggle("on", v === "3d"); $("#v3d").setAttribute("aria-selected", v === "3d");
  $("#v2d").classList.toggle("on", v === "2d"); $("#v2d").setAttribute("aria-selected", v === "2d");
  if (v === "2d") renderPath(); else resize();
}
$("#v3d").addEventListener("click", () => setView("3d"));
$("#v2d").addEventListener("click", () => setView("2d"));

// ---------- 迴圈 ----------
function resize() {
  const w = host.clientWidth, h = host.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  labelRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(host);

const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  const pos = seaGeo.attributes.position.array;
  for (let i = 0; i < pos.length; i += 3) pos[i + 1] = seaBase[i + 1] + Math.sin(seaBase[i] * 0.15 + t) * 0.18 + Math.cos(seaBase[i + 2] * 0.12 + t * 0.8) * 0.15;
  seaGeo.attributes.position.needsUpdate = true;

  flows.forEach((f) => {
    f.t = (f.t + dt * 0.18) % 1;
    f.dot.position.copy(f.curve.getPoint(f.t));
    const hot = current && (f.a === current || f.b === current);
    f.tube.material.color.set(hot ? 0xf2b705 : 0xffffff);
  });
  Object.entries(islandObjs).forEach(([id, o]) => {
    const bob = Math.sin(t * 1.2 + o.group.position.x) * 0.08;
    o.group.position.y = id === current ? 0.5 + bob : bob;
    o.buildings.forEach(({ mesh }) => {
      const s = mesh.userData.target ?? 1;
      mesh.scale.y += (s - mesh.scale.y) * 0.12;
    });
  });
  if (fly) {
    fly.t = Math.min(1, fly.t + dt / 0.9);
    const k = ease(fly.t);
    camera.position.lerpVectors(fly.p0, fly.p1, k);
    controls.target.lerpVectors(fly.t0, fly.t1, k);
    if (fly.t >= 1) fly = null;
  }
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
});

// ---------- 啟動 ----------
resize();
applyStage();
function fromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (BY_ID[id]) selectIsland(id);
  else if (ITEM_ISLAND[id]) selectItem(id);
  else renderHome();
}
window.addEventListener("hashchange", fromHash);
fromHash();
setTimeout(() => ($("#hint").style.opacity = "0.6"), 6000);
