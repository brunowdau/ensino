/* Ensino Lean V12 — bootstrap e roteamento */
(function(){
  "use strict";
  const A=window.LeanApp;
  if(!A)throw new Error("LeanApp core não carregado.");

  A.navigate=()=>{
    A.closeModal();
    A.sidebar?.classList.remove("open");
    document.querySelector("[data-side-scrim]")?.classList.remove("open");
    document.querySelector("[data-mobile-menu]")?.setAttribute("aria-expanded","false");
    A.setActive();

    const h=location.hash||"#home",kind=A.routeKind(),part=h.split("/")[1]?.split("?")[0]||"";
    if(kind==="home")A.pages.home?.();
    else if(kind==="trails")A.pages.trails?.();
    else if(kind==="lesson")A.pages.lesson?.(part);
    else if(kind==="checkpoint")A.pages.checkpoint?.(part);
    else if(kind==="lab")A.pages.lab?.(part);
    else if(kind==="diagnostic")A.pages.diagnostic?.();
    else if(kind==="assessment")A.pages.assessment?.();
    else if(kind==="resolve")A.pages.resolve?.(part);
    else if(kind==="library"){if(h.startsWith("#resource/"))A.pages.resource?.(part);else A.pages.library?.()}
    else if(kind==="simulators")A.pages.simulators?.(part);
    else if(kind==="cases")A.pages.cases?.(part);
    else if(kind==="progress")A.pages.progress?.();
    else if(kind==="review")A.pages.review?.(part);
    else if(kind==="consultant")A.pages.consultant?.();
    else A.pages.home?.();

    window.scrollTo(0,0);
    A.view?.focus({preventScroll:true});
  };

  window.addEventListener("hashchange",A.navigate);
  A.navigate();
  if(!A.state.role&&!A.state.onboarded)setTimeout(()=>A.profileModal(true),120);
})();