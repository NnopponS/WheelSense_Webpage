import{f as _,b,d as L,e as E}from"./page-content-CrDTnGsh.js";import{c as S,a as A,i as $,b as m}from"./scroll-animations-YVwvv1SP.js";const y={"yes-wheelchair":{label:"YES Wheelchair",color:"era1"},"all-wheelchair":{label:"ALL Wheelchair",color:"era2"},wheelsense:{label:"WheelSense",color:"era4"}},M=new Set(Object.keys(y));function v(a,e){if(typeof a!="string"||!a.trim())return JSON.parse(JSON.stringify(e));try{const r=JSON.parse(a);if(Array.isArray(r))return r}catch{}return JSON.parse(JSON.stringify(e))}function k(a){if(Array.isArray(a==null?void 0:a.images)){const e=a.images.map(r=>typeof r=="string"?r.trim():"").filter(Boolean);if(e.length)return e}return typeof(a==null?void 0:a.image)=="string"&&a.image.trim()?[a.image.trim()]:["/assets/Awards/verified-milestones/yes-wheelchair-kide-2023-triple-honors/images/image-01.jpg"]}function x(a){if(typeof a!="string")return"";const e=a.trim().toLowerCase().replace(/\s+/g,"-");return e==="yes-wheelchair"?"yes-wheelchair":e==="all-wheelchair"?"all-wheelchair":e==="wheelsense"?"wheelsense":""}function I(a,e){const r=k(a),t=x(a==null?void 0:a.era)||"all-wheelchair",s=y[t]||y["all-wheelchair"];return{era:t,eraLabel:(a==null?void 0:a.eraLabel)||s.label,eraColor:(a==null?void 0:a.eraColor)||s.color,sortDate:(a==null?void 0:a.sortDate)||"",title:(a==null?void 0:a.title)||`Milestone ${e+1}`,event:(a==null?void 0:a.event)||"Unspecified event",year:(a==null?void 0:a.year)||"-",images:r,description:(a==null?void 0:a.description)||"",sourceLabel:(a==null?void 0:a.sourceLabel)||"Open Source",sourceFile:(a==null?void 0:a.sourceFile)||"/assets/Awards/verified-milestones/yes-wheelchair-kide-2023-triple-honors/docs/source.pdf"}}function C(a,e){return{title:(a==null?void 0:a.title)||`Publication ${e+1}`,journal:(a==null?void 0:a.journal)||"Journal / Source",description:(a==null?void 0:a.description)||"",icon:(a==null?void 0:a.icon)||"Source",link:(a==null?void 0:a.link)||"#"}}function P(a){const r=String(a||"").match(/(20\d{2})/);return r?Number(r[1]):0}function j(a,e){const t=String(a||"").trim().match(/(20\d{2})(?:[-/](\d{1,2}))?/);if(t){const l=Number(t[1]),c=Number(t[2]||"1");return l*100+c}const s=P(e);return s?s*100+1:0}function w(a){const e=`${a.title} ${a.event} ${a.description}`.toLowerCase(),r=j(a.sortDate||"",a.year)*1e3,t=/(international|global|taiwan|china|malaysia|kide|ipitex|innoserve)/.test(e)?400:0;let s=0;return/(grand prize|winner|first place|platinum|gold medal|gold award)/.test(e)?s+=220:/(silver|second runner-up|runner-up)/.test(e)?s+=140:/(merit|outstanding|special prize|compliment)/.test(e)?s+=90:/(presentation|conference|pipeline)/.test(e)&&(s+=40),r+t+s}function z(a,e){const r=a.images.map((s,l)=>`
          <img class="award-card__slide ${l===0?"is-active":""}" src="${s}" alt="${a.event} - ${a.title}" loading="lazy" />
        `).join(""),t=a.images.length>1?`
        <div class="award-card__dots" aria-hidden="true">
          ${a.images.map((s,l)=>`<span class="award-card__dot ${l===0?"is-active":""}" data-dot-index="${l}"></span>`).join("")}
        </div>
      `:"";return`
    <article class="award-card" data-era="${a.era}" style="--delay: ${e*.04}s">
      <div class="award-card__image-wrap" data-carousel="true" data-lightbox-src="${a.images[0]}">
        <div class="award-card__slides">${r}</div>
        ${t}
        <div class="award-card__overlay">
          <span class="award-card__zoom">View</span>
        </div>
      </div>
      <div class="award-card__content">
        <div class="award-card__badge award-card__badge--${a.eraColor}">${a.eraLabel}</div>
        <h3 class="award-card__title">${a.event}</h3>
        <p class="award-card__event">${a.title}</p>
        <p class="award-card__desc">${a.description}</p>
        <div class="award-card__meta">
          <span class="award-card__year">${a.year}</span>
          <a class="award-card__source" href="${a.sourceFile}" target="_blank" rel="noopener noreferrer">${a.sourceLabel}</a>
        </div>
      </div>
    </article>
  `}function O(a){return`
    <article class="pub-card glass-card">
      <div class="pub-card__icon">${a.icon}</div>
      <div class="pub-card__content">
        <h3 class="pub-card__title">${a.title}</h3>
        <p class="pub-card__journal">${a.journal}</p>
        <p class="pub-card__desc">${a.description}</p>
        <a class="pub-card__link" href="${a.link}" target="_blank" rel="noopener noreferrer">Open Source</a>
      </div>
    </article>
  `}function B(a){return`
    <article class="media-card">
      <div class="media-card__image-wrap" data-lightbox-src="${a.src}">
        <img class="media-card__image" src="${a.src}" alt="${a.caption}" loading="lazy" />
        <div class="media-card__overlay">
          <span class="media-card__zoom">View</span>
        </div>
      </div>
      <div class="media-card__caption">${a.caption}</div>
    </article>
  `}async function T(){try{const a=await fetch("/assets/Awards/teamPhoto/photo-map.json",{method:"GET",headers:{Accept:"application/json"}});if(!a.ok)return[];const e=await a.json(),r=Array.isArray(e)?e:e==null?void 0:e.files;return Array.isArray(r)?r.filter(t=>typeof t=="string"&&t.trim()).map(t=>t.trim()).sort((t,s)=>t.localeCompare(s,void 0,{numeric:!0,sensitivity:"base"})).map(t=>({src:`/assets/Awards/teamPhoto/${t}`,caption:t.replace(/\.[a-z0-9]+$/i,"").replace(/[-_]/g," ")})):[]}catch{return[]}}function N(a,e){const r=document.getElementById("statAwards"),t=document.getElementById("statMedia");r&&(r.dataset.counter=String(a.length)),t&&(t.dataset.counter=String(e.length))}function q(){Array.from(document.querySelectorAll('.award-card__image-wrap[data-carousel="true"]')).forEach(e=>{const r=Array.from(e.querySelectorAll(".award-card__slide")),t=Array.from(e.querySelectorAll(".award-card__dot"));if(!r.length)return;let s=0,l=null;const c=u=>{s=(u+r.length)%r.length,r.forEach((p,f)=>{p.classList.toggle("is-active",f===s)}),t.forEach((p,f)=>{p.classList.toggle("is-active",f===s)}),e.dataset.lightboxSrc=r[s].src},n=()=>{l!==null&&(window.clearInterval(l),l=null)},d=()=>{n(),!(r.length<2)&&(l=window.setInterval(()=>{c(s+1)},3200))};t.forEach(u=>{u.addEventListener("click",p=>{p.stopPropagation();const f=Number(u.dataset.dotIndex||"0");c(f),d()})}),e.addEventListener("mouseenter",n),e.addEventListener("mouseleave",d),c(0),d()})}function F(){const a=document.getElementById("awardsFilter");if(!a)return;const e=Array.from(a.querySelectorAll(".awards-filter__tab[data-era]")),r=Array.from(document.querySelectorAll(".award-card[data-era]"));if(!e.length||!r.length)return;const t=c=>{r.forEach(n=>{const d=(n.dataset.era||"").trim().toLowerCase(),u=c==="all"||d===c;n.classList.toggle("is-hidden",!u)}),e.forEach(n=>{const d=(n.dataset.era||"")===c;n.classList.toggle("is-active",d),n.setAttribute("aria-selected",d?"true":"false")})};e.forEach(c=>{c.addEventListener("click",()=>{const n=(c.dataset.era||"").trim().toLowerCase();t(n||"all")})});const s=e.find(c=>c.classList.contains("is-active")),l=((s==null?void 0:s.dataset.era)||"all").trim().toLowerCase();t(l||"all")}document.addEventListener("DOMContentLoaded",async()=>{const a=document.getElementById("loader");a&&setTimeout(()=>{a.classList.add("is-hidden"),setTimeout(()=>a.remove(),600)},800),S("awards"),A(),$();let e={};try{e=await _("awards")}catch{e={}}const r=v(e["data.verifiedMilestones"],L).map((o,i)=>I(o,i)).filter(o=>M.has(o.era)).sort((o,i)=>w(i)-w(o)),t=v(e["data.publications"],E).map((o,i)=>C(o,i)),s=document.getElementById("awardsGrid"),l=document.getElementById("publicationsGrid"),c=document.getElementById("teamPhotoGrid");if(!s||!l)return;if(s.innerHTML=r.map((o,i)=>z(o,i)).join(""),l.innerHTML=t.map(o=>O(o)).join(""),c){const o=await T();c.innerHTML=o.map(i=>B(i)).join("")}b("awards",e),N(r,t),q(),F();const n=document.getElementById("lightbox"),d=document.getElementById("lightboxImg"),u=document.getElementById("lightboxClose");document.addEventListener("click",o=>{const i=o.target,g=i==null?void 0:i.closest("[data-lightbox-src]");if(!g)return;const h=g.dataset.lightboxSrc;!h||!n||!d||(d.src=h,n.classList.add("is-active"),document.body.style.overflow="hidden")}),u==null||u.addEventListener("click",()=>{n&&(n.classList.remove("is-active"),document.body.style.overflow="")}),n==null||n.addEventListener("click",o=>{o.target===n&&(n.classList.remove("is-active"),document.body.style.overflow="")}),document.addEventListener("keydown",o=>{o.key==="Escape"&&(n!=null&&n.classList.contains("is-active"))&&(n.classList.remove("is-active"),document.body.style.overflow="")});const p=document.querySelector(".awards-hero__content"),f=document.querySelector(".scroll-indicator");window.addEventListener("scroll",()=>{const o=window.scrollY,i=100,h=Math.min(1,Math.max(0,(o-i)/(500-i)));p&&(p.style.opacity=String(1-h),p.style.transform=`translateY(${h*-50}px)`),f&&(f.style.opacity=String(Math.max(0,.4-h)))},{passive:!0}),m()});
