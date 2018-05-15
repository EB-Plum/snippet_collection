/*
* some basic script to make html page for kiosk-like use
* no context-menu
* no pinchzoom
* may raise WARNING due to 'touchmove' not allowing preventDefault() by default(which default passive:true)
* some buggy result with random touch actions
* may be annoying to use with touch-dragging
*/


// prevent pinch zoom
document.addEventListener('touchmove', function prevent_pinchzoom(ev){
  if ( ev.changedTouches.length > 1 || ev.touches.length > 1){
    event.preventDefault();
  }
}, {passive: false});

// prevent context menu
document.addEventListener('contextmenu', function prevent_contextmenu(ev){
  event.preventDefault();
}, {passive: false});
