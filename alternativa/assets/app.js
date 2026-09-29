(function(){
 "use strict";const A=window.ALT;
 A.setActive=()=>{
  const h=location.hash||"#home",key=h.split("/")[0].replace("#","")||"home";
  document.querySelectorAll("[data-nav]").forEach(x=>x.dataset.nav===key?x.setAttribute("aria-current","page"):x.removeAttribute("aria-current"));
 };
 A.navigate=()=>{
  A.close();A.sidebar?.classList.remove("open");document.querySelector("[data-side-scrim]")?.classList.remove("open");A.setActive();
  const raw=(location.hash||"#home").slice(1),[path]=raw.split("?"),parts=path.split("/"),root=parts[0]||"home";
  if(root==="home")A.pages.home?.();
  else if(root==="learn")A.pages.learn?.(parts[1]||"");
  else if(root==="practice"){
    if(parts[1]==="case")A.pages.practice?.(parts[2]||"","case");
    else A.pages.practice?.(parts[1]||"");
  }
  else if(root==="work")A.pages.work?.(parts[1]||"",parts[2]||"");
  else if(root==="evolve")A.pages.evolve?.(parts[1]||"",parts[2]||"");
  else A.pages.home?.();
  window.scrollTo(0,0);A.view?.focus({preventScroll:true});
 };
 window.addEventListener("hashchange",A.navigate);
 A.navigate();
 if(!A.state.onboarded)setTimeout(()=>A.profileModal(),120);
})();