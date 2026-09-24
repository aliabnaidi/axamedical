const navbar=document.getElementById('navbar');
const menuToggle=document.getElementById('menuToggle');
const navLinks=document.getElementById('navLinks');

window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>40));
menuToggle.addEventListener('click',()=>navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.stats strong').forEach(el=>{
  const target=el.textContent;
  if(!/^\d+\+?$/.test(target)) return;
  const num=parseInt(target);
  el.textContent='0'+(target.includes('+')?'+':'');
  const obs=new IntersectionObserver(([entry])=>{
    if(!entry.isIntersecting)return;
    let start=0; const step=Math.max(1,Math.ceil(num/40));
    const timer=setInterval(()=>{
      start+=step;if(start>=num){start=num;clearInterval(timer)}
      el.textContent=start+(target.includes('+')?'+':'');
    },30);
    obs.disconnect();
  },{threshold:.7});
  obs.observe(el);
});
