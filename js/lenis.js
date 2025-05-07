document.addEventListener('DOMContentLoaded', function () {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  window.scrollTo(0, {immediate: true, force:true});
  lenis.scrollTo(0, {immediate: true, force:true});

  requestAnimationFrame(raf);
});