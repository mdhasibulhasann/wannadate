const config=window.DATE_INVITE_CONFIG||{inviteeName:'Mayabi',inviterName:'Hasib'};document.querySelectorAll('[data-invitee]').forEach(el=>el.textContent=config.inviteeName);document.querySelectorAll('[data-inviter]').forEach(el=>el.textContent=config.inviterName);document.title=`Plan a Date with ${config.inviteeName} ♡`;const FORM_ENDPOINT='https://script.google.com/macros/s/AKfycbxurB_XHQoGd-lCa5ZWO-F3Fdy0KZK9SxT7bGn6QbOcejsVHrFtpbno8_Hy7lmvWBsQ/exec';

const placeGrid = document.querySelector('#placeGrid');

placeGrid.innerHTML = config.locations.map(location => `
  <label class="place-option">
    <input type="radio" name="place" value="${location.name}">
    <span class="place-card">
      <b>${location.emoji}</b>
      <strong>${location.name}</strong>
      <small>${location.description}</small>
    </span>
  </label>
`).join('');

const form=document.querySelector('#dateForm'),steps=[...document.querySelectorAll('.form-step')],dots=[...document.querySelectorAll('.progress-dots span')],dateInput=document.querySelector('#dateInput'),timeInput=document.querySelector('#timeInput'),statusEl=document.querySelector('#formStatus');let current=0;
const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());dateInput.min=today.toISOString().split('T')[0];
function validStep(){if(current===0&&!dateInput.value){dateInput.reportValidity();return false}if(current===1&&!form.place.value){statusEl.textContent='Please choose Dhaka or Cumilla 💗';setTimeout(()=>statusEl.textContent='',2200);return false}return true}
function go(next){if(next>current&&!validStep())return;steps[current].classList.remove('active');current=next;steps[current].classList.add('active');dots.forEach((d,i)=>d.classList.toggle('active',i===current));if(current===2)updateSummary()}
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go(current+1)));document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',()=>go(current-1)));document.querySelectorAll('[name=place]').forEach(r=>r.addEventListener('change',()=>setTimeout(()=>go(2),260)));
function niceDate(v){return new Date(v+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}function niceTime(v){if(!v)return 'your chosen time';const [h,m]=v.split(':');return new Date(2000,0,1,+h,+m).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'})}
function updateSummary(){if(dateInput.value&&form.place.value)document.querySelector('#summary').textContent=`${niceDate(dateInput.value)} • ${form.place.value}`}
async function submitToSheet(data){if(FORM_ENDPOINT.startsWith('PASTE_')){localStorage.setItem('mayabiDatePlan',JSON.stringify(data));return {demo:true}}const body=new URLSearchParams(data);await fetch(FORM_ENDPOINT,{method:'POST',mode:'no-cors',body});return {demo:false}}
form.addEventListener('submit',async e=>{e.preventDefault();if(!timeInput.value){timeInput.reportValidity();return}const btn=form.querySelector('.final-btn');btn.disabled=true;btn.textContent='Saving our date…';const data={date:dateInput.value,place:form.place.value,time:timeInput.value,name:config.inviteeName,invitedBy:config.inviterName,submittedAt:new Date().toISOString()};try{const result=await submitToSheet(data);showSuccess(data,result.demo)}catch{statusEl.textContent='Could not save yet. Please try again.';btn.disabled=false;btn.textContent='Finalise Date 💗'}});
function showSuccess(data,demo){const screen=document.querySelector('#successScreen');document.querySelector('#finalDetails').innerHTML=`${niceDate(data.date)}<br>${data.place} • ${niceTime(data.time)}${demo?'<br><small>Preview saved on this phone</small>':''}`;screen.classList.add('show');screen.setAttribute('aria-hidden','false');for(let i=0;i<38;i++){setTimeout(()=>{const k=document.createElement('span');k.textContent=['💋','💗','💕'][i%3];const side=Math.floor(Math.random()*4);let x=side<2?(Math.random()<.5?-innerWidth:innerWidth):Math.random()*innerWidth-innerWidth/2;let y=side>=2?(Math.random()<.5?-innerHeight:innerHeight):Math.random()*innerHeight-innerHeight/2;k.style.left=(innerWidth/2+Math.random()*90-45)+'px';k.style.top=(innerHeight/2+Math.random()*90-45)+'px';k.style.setProperty('--x',x+'px');k.style.setProperty('--y',y+'px');k.style.setProperty('--r',(Math.random()*240-120)+'deg');document.querySelector('#kissRain').appendChild(k);setTimeout(()=>k.remove(),2500)},i*55)}}
function setupMusic(){const audio=document.querySelector('#bgMusic'),btn=document.querySelector('#musicToggle');btn.addEventListener('click',async()=>{try{if(audio.paused){await audio.play();btn.classList.add('playing');btn.querySelector('span').textContent='Song playing'}else{audio.pause();btn.classList.remove('playing');btn.querySelector('span').textContent='Play our song'}}catch{btn.querySelector('span').textContent='Add our-song.mp3'}})}setupMusic();
