document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const indContainer = document.getElementById("indicators");
    let index = 0;
    let isScrolling = false;

    // Aplica as imagens de fundo com gradiente para leitura
    slides.forEach(slide => {
        const url = slide.getAttribute("data-bg");
        slide.style.backgroundImage = `linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.4)), url('${url}')`;
    });

    // Cria indicadores dinâmicos
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
        document.querySelectorAll(".indicator")[index].classList.add("active");
    }

    changeSlide(0);

    // Splash Screen
    document.getElementById("splash").onclick = function() {
        this.style.opacity = "0";
        setTimeout(() => this.style.display = "none", 800);
    }

    // Navegação via Scroll
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        isScrolling = true;
        changeSlide(e.deltaY > 0 ? index + 1 : index - 1);
        setTimeout(() => isScrolling = false, 1000);
    }, { passive: true });

    // Logo volta ao topo
    document.getElementById("logoNav").onclick = () => changeSlide(0);
});
