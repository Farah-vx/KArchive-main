// carousel 
const scene = document.querySelector('.scene');
const carousel = document.getElementById('carousel');
let isDragging = false, startX, currentRotation = 0, dragRotation = 0;

if(scene && carousel) {
    scene.addEventListener('mousedown', (e) => { 
        isDragging = true; 
        startX = e.clientX; 
        scene.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragRotation = (e.clientX - startX) * 0.4; 
        carousel.style.transform = `rotateY(${currentRotation + dragRotation}deg)`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        scene.style.cursor = 'grab';
        currentRotation += dragRotation; 
    });
}

// tilt 
document.querySelectorAll('.tilt-box').forEach(box => {
    const visual = box.querySelector('.trend-visual img');
    box.addEventListener('mousemove', (e) => {
        const { width, height, left, top } = box.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        if(visual) visual.style.transform = `rotateY(${x * 15}deg) rotateX(${y * -15}deg) scale(1.05)`;
    });
    box.addEventListener('mouseleave', () => {
        if(visual) visual.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    });
});

// slide effect
const sections = document.querySelectorAll('.mag-section');

const options = {
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-section');
        } else {
          
            entry.target.classList.remove('active-section');
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});


window.addEventListener('scroll', () => {
    const bgText = document.querySelector('.mag-bg-text');
    if(bgText) {
        let offset = window.pageYOffset;
        bgText.style.transform = `translateY(${offset * 0.2}px)`;
    }
});

// re-initialize observer with a more sensitive threshold for tall sections
const varietyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-section');
        }
    });
}, { threshold: 0.2 }); // triggers earlier so content reveals while scrolling down
const reveals = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up, .reveal-down, .reveal-zoom');
document.querySelectorAll('.variety-item').forEach(item => {
    varietyObserver.observe(item);

});



