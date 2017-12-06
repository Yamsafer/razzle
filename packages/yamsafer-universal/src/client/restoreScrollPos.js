export default function({ scrollPositionsHistory, location }) {
  const pos = scrollPositionsHistory[location.pathname];
  let scrollX = 0;
  let scrollY = 0;
  if (pos) {
    scrollX = pos.scrollX;
    scrollY = pos.scrollY;
  } else {
    const targetHash = location.hash && location.hash.substr(1);
    if (targetHash) {
      const target = document.getElementById(targetHash);
      if (target) {
        scrollY = window.pageYOffset + target.getBoundingClientRect().top;
      }
    }
  }
  window.scrollTo(scrollX, scrollY);
}
