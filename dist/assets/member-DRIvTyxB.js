import{f as T,c as j}from"./page-content-CrDTnGsh.js";import{c as B,a as C,i as M,b as A}from"./scroll-animations-YVwvv1SP.js";const $=new Map([["worapon-sangsasri",0],["suppawit-ausawalaithong",1]]);function e(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function L(t){if(typeof t!="string"||!t.trim())return j();try{const a=JSON.parse(t);if(Array.isArray(a))return a}catch{}return j()}function d(t){return Array.isArray(t)?t.map(a=>String(a??"").trim()).filter(Boolean):[]}function R(t,a){const i=String(t??"").trim();if(!i)return"";const o=i.replace(/\s+/g,"");return/^\?+$/.test(o)?a:i}function E(t){const a=String(t||"").trim();if(!a||a.includes("(+66)"))return a;const i=a.replace(/[^\d]/g,"");if(!/^0\d{8,9}$/.test(i))return a;const o=i.slice(1);return o.length===9?`(+66) ${o.slice(0,2)}-${o.slice(2,5)}-${o.slice(5)}`:o.length===8?`(+66) ${o.slice(0,1)}-${o.slice(1,4)}-${o.slice(4)}`:a}function z(t){const a=String(t??"").trim();return a?a.replace(/\b0\d{1,2}-\d{3}-\d{4}\b/g,i=>E(i)):""}function I(t,a){const i=String((t==null?void 0:t.name)||"Unnamed Member").trim(),o=Array.isArray(t==null?void 0:t.details)?t.details.map(s=>({label:String((s==null?void 0:s.label)??"").trim(),value:/phone/i.test(String((s==null?void 0:s.label)??"").trim())?E(String((s==null?void 0:s.value)??"").trim()):String((s==null?void 0:s.value)??"").trim()})).filter(s=>s.label||s.value):[],n=t!=null&&t.cv&&typeof t.cv=="object"?{...t.cv,contact:z(t.cv.contact)}:null;return{id:(t==null?void 0:t.id)||`member-${a+1}`,name:i,thaiName:R(t==null?void 0:t.thaiName,i),level:(t==null?void 0:t.level)||"Team Member",role:(t==null?void 0:t.role)||"Research Team",subtitle:(t==null?void 0:t.subtitle)||"WheelSense Team",gradient:(t==null?void 0:t.gradient)||"linear-gradient(135deg, #1a1b2e, #0e1018)",photo:typeof(t==null?void 0:t.photo)=="string"?t.photo:"",bio:(t==null?void 0:t.bio)||"Profile details are being updated.",details:o,focus:d(t==null?void 0:t.focus),projects:d(t==null?void 0:t.projects),education:d(t==null?void 0:t.education),cv:n}}function H(t){return[...t].sort((a,i)=>{const o=$.has(a.id)?$.get(a.id)??1e3:1e3,n=$.has(i.id)?$.get(i.id)??1e3:1e3;return o!==n?o-n:a.name.localeCompare(i.name)})}function P(t){return t.length?`<div class="skill-tags">${t.map(a=>`<span class="skill-tag">${e(a)}</span>`).join("")}</div>`:'<p class="member-accordion__text">-</p>'}function u(t){return t.length?`<ul class="compact-list">${t.map(a=>`<li>${e(a)}</li>`).join("")}</ul>`:'<p class="member-accordion__text">-</p>'}function O(t){return t.length?`
    <div class="member-grid">
      ${t.map(a=>`
        <div class="profile-meta-item">
          <p class="profile-meta-item__label">${e(a.label||"-")}</p>
          <p class="profile-meta-item__value">${e(a.value||"-")}</p>
        </div>
      `).join("")}
    </div>
  `:'<p class="member-accordion__text">-</p>'}function S(t){return Array.isArray(t)?t.map(a=>({title:typeof(a==null?void 0:a.title)=="string"?a.title.trim():"",role:typeof(a==null?void 0:a.role)=="string"?a.role.trim():"",organization:typeof(a==null?void 0:a.organization)=="string"?a.organization.trim():"",school:typeof(a==null?void 0:a.school)=="string"?a.school.trim():"",detail:typeof(a==null?void 0:a.detail)=="string"?a.detail.trim():"",period:typeof(a==null?void 0:a.period)=="string"?a.period.trim():"",extra:typeof(a==null?void 0:a.extra)=="string"?a.extra.trim():"",highlights:d(a==null?void 0:a.highlights)})).filter(a=>!!(a.title||a.role||a.organization||a.school||a.detail||a.period||a.extra||a.highlights&&a.highlights.length)):[]}function x(t){return t.length?`
    <div class="cv-entry-grid">
      ${t.map(a=>{const i=a.role||a.title||a.detail||"-",o=a.organization||a.school||"",n=[a.period,a.extra].filter(Boolean).join(" | ");return`
          <article class="cv-entry">
            <h3 class="cv-entry__title">${e(i)}</h3>
            ${o?`<p class="cv-entry__meta">${e(o)}</p>`:""}
            ${n?`<p class="cv-entry__meta">${e(n)}</p>`:""}
            ${a.highlights&&a.highlights.length?u(a.highlights):""}
          </article>
        `}).join("")}
    </div>
  `:'<p class="member-accordion__text">-</p>'}function D(t){return!t||typeof t!="object"?'<p class="member-accordion__text">-</p>':`
    <div class="skills-grid">
      ${[{label:"Core",value:t.core||"-"},{label:"Languages",value:t.languages||"-"},{label:"Frameworks",value:t.frameworks||"-"},{label:"Tools",value:t.tools||"-"},{label:"Soft Skills",value:t.soft||"-"},{label:"Language Skills",value:t.languageSkills||"-"}].map(i=>`
        <div class="skills-grid__item">
          <p class="skills-grid__label">${e(i.label)}</p>
          <p class="skills-grid__value">${e(i.value)}</p>
        </div>
      `).join("")}
    </div>
  `}function c(t,a,i=!1){return`
    <details class="member-accordion__item reveal" ${i?"open":""}>
      <summary>${e(t)}</summary>
      <div class="member-accordion__body">
        ${a}
      </div>
    </details>
  `}function W(t){const a=[];return t.thaiName&&t.thaiName.trim()&&a.push({label:"Name (TH)",value:t.thaiName}),t.details.forEach(i=>{(i.label||i.value)&&a.push(i)}),a.length?a.map(i=>`
    <div class="member-summary__meta-row">
      <p class="member-summary__meta-label">${e(i.label||"-")}</p>
      <p class="member-summary__meta-value">${e(i.value||"-")}</p>
    </div>
  `).join(""):`
      <div class="member-summary__meta-row">
        <p class="member-summary__meta-label">Profile</p>
        <p class="member-summary__meta-value">Detail records are being updated.</p>
      </div>
    `}function F(t){const a=t.cv&&typeof t.cv=="object"?t.cv:null,i=S(a==null?void 0:a.education),o=S(a==null?void 0:a.workExperience),n=S(a==null?void 0:a.projects),s=d(a==null?void 0:a.honors),h=d(a==null?void 0:a.certifications),g=d(a==null?void 0:a.researchPublications),f=d(a==null?void 0:a.books),r=d(a==null?void 0:a.patents),v=t.name.split(" ").filter(Boolean).slice(0,2).map(m=>{var _;return((_=m[0])==null?void 0:_.toUpperCase())||""}).join(""),p=t.photo?`<img src="${e(t.photo)}" alt="${e(t.name)}" loading="lazy" />`:`<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--color-text-primary);font-family:var(--font-display);font-size:2rem;">${e(v||"WS")}</div>`,l=[],k=`
    <p class="member-accordion__text">${e(t.bio||"-")}</p>
    <p class="member-accordion__text"><strong>Contact and Profile Details</strong></p>
    ${O(t.details)}
    <p class="member-accordion__text"><strong>Focus Areas</strong></p>
    ${P(t.focus)}
    <p class="member-accordion__text"><strong>Project Involvement</strong></p>
    ${P(t.projects)}
    ${t.education.length?`
      <p class="member-accordion__text"><strong>Academic Background</strong></p>
      ${u(t.education)}
    `:""}
  `;if(l.push(c("Profile Overview",k,!0)),a){const m=[a.headline,a.institution,a.contact].map(_=>String(_??"").trim()).filter(Boolean);m.length&&l.push(c("CV Headline and Contact",u(m),!0)),i.length&&l.push(c("CV Education",x(i))),o.length&&l.push(c("Work Experience",x(o))),n.length&&l.push(c("Project Portfolio",x(n))),g.length&&l.push(c("Research Publications",u(g))),s.length&&l.push(c("Honors and Awards",u(s))),f.length&&l.push(c("Books",u(f))),r.length&&l.push(c("Patents and Copyrights",u(r))),l.push(c("Skills Matrix",D(a.skills))),h.length&&l.push(c("Certifications",u(h)))}const w=[i.length,o.length,n.length,g.length,s.length,f.length,r.length,h.length].filter(m=>m>0).length,N=t.thaiName&&t.thaiName.trim()&&t.thaiName.trim()!==t.name.trim()?`<p class="member-summary__thai-name">${e(t.thaiName)}</p>`:"";return`
    <div class="member-shell">
      <aside class="member-summary reveal">
        <div class="member-summary__photo" style="background: ${e(t.gradient)};">
          ${p}
        </div>
        <h2 class="member-summary__name">${e(t.name)}</h2>
        ${N}
        <p class="member-summary__role">${e(t.level)} | ${e(t.role)}</p>
        <div class="member-summary__chips">
          <span class="member-summary__chip">${e(t.level||"Member")}</span>
          <span class="member-summary__chip">${t.projects.length} projects</span>
          <span class="member-summary__chip">${t.focus.length} focus areas</span>
          <span class="member-summary__chip">${w} CV sections</span>
        </div>
        <div class="member-summary__meta">
          ${W(t)}
        </div>
        <div class="member-summary__actions">
          <a class="member-summary__button" href="/team.html">Back to Team</a>
          <a class="member-summary__button" href="/projects.html">View Projects</a>
        </div>
      </aside>

      <div class="member-accordion">
        ${l.join("")}
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",async()=>{const t=document.getElementById("loader");setTimeout(()=>{t==null||t.classList.add("is-hidden"),setTimeout(()=>t==null?void 0:t.remove(),600)},800),B("team"),C(),M();let a={};try{a=await T("team")}catch{a={}}const i=H(L(a["data.members"]).map((p,l)=>I(p,l))),n=new URLSearchParams(window.location.search).get("id")||"",s=i.find(p=>p.id===n)||i[0],h=document.getElementById("memberName"),g=document.getElementById("memberRole"),f=document.getElementById("memberSubtitle"),r=document.getElementById("memberHeroPhoto"),v=document.getElementById("memberProfile");!s||!v||!h||!g||!f||(h.textContent=s.name||"Member Profile",g.textContent=`${s.level||""} | ${s.role||""}`,f.textContent=[s.subtitle,s.thaiName&&s.thaiName!==s.name?s.thaiName:""].map(p=>String(p||"").trim()).filter(Boolean).join(" | "),r instanceof HTMLImageElement&&(s.photo?(r.src=s.photo,r.alt=s.name||"Member portrait",r.classList.remove("is-hidden")):(r.removeAttribute("src"),r.classList.add("is-hidden"))),v.innerHTML=F(s),A())});
