import{f as N,b as A,c as $}from"./page-content-CrDTnGsh.js";import{c as E,a as L,i as w,b as x}from"./scroll-animations-YVwvv1SP.js";function j(t){if(typeof t!="string"||!t.trim())return $();try{const a=JSON.parse(t);if(Array.isArray(a))return a}catch{}return $()}function T(t,a){const o=String(t??"").trim();if(!o)return"";const s=o.replace(/\s+/g,"");return/^\?+$/.test(s)?a:o}function C(t){const a=String(t||"").trim();if(!a||a.includes("(+66)"))return a;const o=a.replace(/[^\d]/g,"");if(!/^0\d{8,9}$/.test(o))return a;const s=o.slice(1);return s.length===9?`(+66) ${s.slice(0,2)}-${s.slice(2,5)}-${s.slice(5)}`:s.length===8?`(+66) ${s.slice(0,1)}-${s.slice(1,4)}-${s.slice(4)}`:a}function I(t,a){const o=(t==null?void 0:t.id)||`member-${a+1}`,s=String((t==null?void 0:t.name)||"Unnamed Member").trim(),l=Array.isArray(t==null?void 0:t.details)?t.details.map(e=>{const c=String((e==null?void 0:e.label)??"").trim(),i=String((e==null?void 0:e.value)??"").trim();return{label:c,value:/phone/i.test(c)?C(i):i}}):[];return{id:o,name:s,thaiName:T(t==null?void 0:t.thaiName,s),level:(t==null?void 0:t.level)||"Team Member",role:(t==null?void 0:t.role)||"Research Team",subtitle:(t==null?void 0:t.subtitle)||"WheelSense Team",gradient:(t==null?void 0:t.gradient)||"linear-gradient(135deg, #1a1b2e, #0e1018)",photo:typeof(t==null?void 0:t.photo)=="string"?t.photo:"",bio:(t==null?void 0:t.bio)||"Profile details are being updated.",details:l,focus:Array.isArray(t==null?void 0:t.focus)?t.focus:[],projects:Array.isArray(t==null?void 0:t.projects)?t.projects:[],education:Array.isArray(t==null?void 0:t.education)?t.education:[],cv:t!=null&&t.cv&&typeof t.cv=="object"?t.cv:null}}function P(t){const a=new Map([["worapon-sangsasri",0],["suppawit-ausawalaithong",1]]);return[...t].sort((o,s)=>{const l=a.has(o.id)?Number(a.get(o.id)):100+t.indexOf(o),e=a.has(s.id)?Number(a.get(s.id)):100+t.indexOf(s);return l-e})}function B(t){const a=t.details.map(i=>`
      <div class="profile-meta-item">
        <p class="profile-meta-item__label">${i.label}</p>
        <p class="profile-meta-item__value">${i.value}</p>
      </div>
    `).join(""),o=t.focus.map(i=>`<span class="skill-tag">${i}</span>`).join(""),s=(t.projects||[]).map(i=>`<span class="skill-tag">${i}</span>`).join(""),l=t.education.length?`
      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Education</p>
        <div class="profile-education-list">
          ${t.education.map(i=>`<p class="profile-education-list__item">${i}</p>`).join("")}
        </div>
      </div>
    `:"",e=t.photo?`<img class="profile-detail__portrait-image" src="${t.photo}" alt="${t.name}" loading="lazy" />`:"",c=t.thaiName&&t.thaiName.trim()&&t.thaiName.trim()!==t.name.trim()?`<p class="profile-detail__secondary-name">${t.thaiName}</p>`:"";return`
    <div class="container">
      <div class="profile-detail__hero">
        <div class="profile-detail__portrait" style="background: ${t.gradient};">${e}</div>
        <div class="profile-detail__header">
          <h1>${t.name}</h1>
          ${c}
          <p>${t.role}</p>
          <p class="profile-detail__secondary-name">${t.subtitle}</p>
          <div class="profile-detail__actions">
            <a class="btn btn-primary" href="/member.html?id=${encodeURIComponent(t.id)}">View More</a>
          </div>
        </div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Profile</p>
        <p class="text-body-lg text-secondary" style="line-height: var(--leading-relaxed); max-width: 760px; margin-bottom: var(--space-md);">${t.bio}</p>
        <div class="profile-meta-grid">${a}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Focus Areas</p>
        <div class="skill-tags">${o||'<span class="skill-tag">-</span>'}</div>
      </div>

      <div class="profile-detail__section">
        <p class="profile-detail__section-label">Project Involvement</p>
        <div class="skill-tags">${s||'<span class="skill-tag">-</span>'}</div>
      </div>

      ${l}
    </div>
  `}document.addEventListener("DOMContentLoaded",async()=>{const t=document.getElementById("loader");t&&setTimeout(()=>{t.classList.add("is-hidden"),setTimeout(()=>t.remove(),600)},800),E("team"),L(),w();let a={};try{a=await N("team")}catch{a={}}const o=P(j(a["data.members"]).map((i,n)=>I(i,n))),s=document.getElementById("teamPageGrid");if(!s)return;o.forEach(i=>{const n=document.createElement("article");n.className="team-profile",n.dataset.memberId=i.id;const p=i.photo?`<img class="team-profile__image-photo" src="${i.photo}" alt="${i.name}" loading="lazy" />`:"";n.innerHTML=`
      <div class="team-profile__image">
        ${p}
        <div class="team-profile__image-gradient" style="background: ${i.gradient};"></div>
      </div>
      <div class="team-profile__info">
        <span class="team-profile__level">${i.level}</span>
        <h3 class="team-profile__name">${i.name}</h3>
        <p class="team-profile__role">${i.role}</p>
        <p class="team-profile__subtitle">${i.subtitle}</p>
        <div class="team-profile__actions">
          <a class="team-profile__more" href="/member.html?id=${encodeURIComponent(i.id)}">View More</a>
        </div>
      </div>
    `,s.appendChild(n)}),A("team",a),x();const l=document.getElementById("profileDetail"),e=document.getElementById("profileDetailContent"),c=document.getElementById("profileDetailClose");s.addEventListener("click",i=>{var f,u,v,_,g,h;const n=i.target;if(!n||n.closest(".team-profile__more"))return;const d=n.closest(".team-profile");if(!d)return;const r=o.find(S=>S.id===d.dataset.memberId);if(!r||!e||!l)return;const y=((u=(f=d.querySelector(".team-profile__name"))==null?void 0:f.textContent)==null?void 0:u.trim())||r.name,k=((_=(v=d.querySelector(".team-profile__role"))==null?void 0:v.textContent)==null?void 0:_.trim())||r.role,M=((h=(g=d.querySelector(".team-profile__subtitle"))==null?void 0:g.textContent)==null?void 0:h.trim())||r.subtitle;e.innerHTML=B({...r,name:y,role:k,subtitle:M}),l.classList.add("is-open"),document.body.style.overflow="hidden"}),c==null||c.addEventListener("click",()=>{l&&(l.classList.remove("is-open"),document.body.style.overflow="")}),document.addEventListener("keydown",i=>{i.key==="Escape"&&l&&(l.classList.remove("is-open"),document.body.style.overflow="")})});
