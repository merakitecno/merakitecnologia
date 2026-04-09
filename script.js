document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const indContainer = document.getElementById("indicators");
    let index = 0;
    let isScrolling = false;
    let touchStartY = 0;

    // Inicializa fundos dinamicamente
    slides.forEach(slide => {
        const url = slide.getAttribute("data-bg");
        slide.style.backgroundImage = `linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.3)), url('${url}')`;
    });

    // Cria indicadores laterais
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "indicator";
        dot.onclick = () => changeSlide(i);
        indContainer.appendChild(dot);
    });

    window.changeSlide = function(newIndex) {
        index = (newIndex + slides.length) % slides.length;
        slides.forEach(s => s.classList.remove("active"));
        document.querySelectorAll(".indicator").forEach(d => d.classList.remove("active"));
        
        slides[index].classList.add("active");
        if(document.querySelectorAll(".indicator")[index]) {
            document.querySelectorAll(".indicator")[index].classList.add("active");
        }
    }

    changeSlide(0);

    // Navegação via Scroll (Mouse)
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        isScrolling = true;
        changeSlide(e.deltaY > 0 ? index + 1 : index - 1);
        setTimeout(() => isScrolling = false, 1000);
    }, { passive: true });

    // Navegação via Toque (Celular)
    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        let touchEndY = e.changedTouches[0].clientY;
        let diff = touchStartY - touchEndY;
        if (Math.abs(diff) > 50) {
            changeSlide(diff > 0 ? index + 1 : index - 1);
        }
    }, { passive: true });

    // Splash Screen click
    const splash = document.getElementById("splash");
    if(splash) {
        splash.onclick = () => {
            splash.style.opacity = "0";
            setTimeout(() => splash.style.display = "none", 600);
        }
    }

    // Logo volta ao início
    document.getElementById("logoNav").onclick = () => changeSlide(0);
});
