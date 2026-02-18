// SPLASH SCREEN
const splash = document.getElementById("splash");

splash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.style.display = "none";
    auto = true; // ativa o automático só depois da splash
  }, 600);
});



// --- NAVEGAÇÃO POR SCROLL ---
let scrollTimeout;

window.addEventListener("wheel", (event) => {
  auto = false; // desativa automático ao usar scroll

  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    if (event.deltaY > 0) {
      // Scroll para baixo → próximo slide
      index = (index + 1) % slides.length;
    } else {
      // Scroll para cima → slide anterior
      index = (index - 1 + slides.length) % slides.length;
    }
    showSlide(index);
  }, 80); // evita múltiplos disparos
});

const slides = document.querySelectorAll(".slide");
let index = 0;
let auto = true;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

showSlide(index);

function nextSlide(){
  if(!auto) return;
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 6000);

["wheel","touchstart","keydown","mousedown"].forEach(evt=>{
  window.addEventListener(evt,()=>auto=false,{once:true});
});

document.getElementById("logoNav").addEventListener("click",()=>{
  index = 0;
  auto = true;
  showSlide(0);
});
