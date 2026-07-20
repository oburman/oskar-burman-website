
const map = L.map('map', {scrollWheelZoom:false}).setView([32.78,-117.12], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
const markers = new Map();
const markerColors = {'Multifamily':'#504f57','Single Family':'#b27f3a','Commercial':'#d6a45b'};
function iconFor(type){return L.divIcon({className:'',html:`<div style="width:18px;height:18px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${markerColors[type]};border:3px solid white;box-shadow:0 2px 7px rgba(0,0,0,.35)"></div>`,iconSize:[20,20],iconAnchor:[10,20]});}
function popup(p){return `<strong>${p.name}</strong><br>${p.address}<br>${p.units} ${p.type==='Commercial'?'office spaces':'unit'+(p.units===1?'':'s')} · ${p.type}`;}
function renderCards(filter='All'){
 const grid=document.getElementById('property-grid'); grid.innerHTML='';
 properties.filter(p=>filter==='All'||p.type===filter).forEach((p,i)=>{
  const card=document.createElement('article');card.className='card';card.id=`property-${properties.indexOf(p)}`;
  card.innerHTML=`<span class="type">${p.type}</span><h3>${p.name}</h3><div class="address">${p.address}</div><div class="meta"><span>${p.units} ${p.type==='Commercial'?'office spaces':'unit'+(p.units===1?'':'s')}</span><span class="focus">View on map →</span></div>`;
  card.onclick=()=>focusProperty(properties.indexOf(p)); grid.appendChild(card);
 });
}
function focusProperty(i){const p=properties[i],m=markers.get(i); map.setView([p.lat,p.lng],15,{animate:true});m.openPopup();document.querySelectorAll('.card').forEach(c=>c.classList.remove('highlight'));const c=document.getElementById(`property-${i}`);if(c){c.classList.add('highlight');c.scrollIntoView({behavior:'smooth',block:'center'});}}
properties.forEach((p,i)=>{const m=L.marker([p.lat,p.lng],{icon:iconFor(p.type)}).addTo(map).bindPopup(popup(p));m.on('click',()=>{document.querySelectorAll('.card').forEach(c=>c.classList.remove('highlight'));const c=document.getElementById(`property-${i}`);if(c)c.classList.add('highlight');});markers.set(i,m);});
document.querySelectorAll('.filter').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCards(b.dataset.filter);});
renderCards();
