function initVideos(container = document) {
    container.querySelectorAll('.video').forEach(el => {
        if (el.dataset.initialized) return;
        el.dataset.initialized = 'true';

        const src = el.dataset.src;
        if (!src) return;

        const videoId = src.split('/embed/')[1]?.replace('/', '');
        if (!videoId) return;

        // Qualidades do YouTube (em cascata)
        const qualities = [
            'maxresdefault',
            'hqdefault',
            'mqdefault',
            'sddefault',
            'default'
        ];

        let i = 0;

        const img = document.createElement('img');
        img.className = 'w-full h-full object-cover';

        function tryThumbnail() {
            if (i >= qualities.length) return;
            img.src = `https://img.youtube.com/vi/${videoId}/${qualities[i]}.jpg`;
        }

        img.onerror = () => {
            i++;
            tryThumbnail();
        };

        tryThumbnail();

        // Layout base
        el.innerHTML = '';
        el.classList.add('relative', 'cursor-pointer');

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 flex items-center justify-center';

        overlay.innerHTML = `
            <div class="bg-black/60 rounded-full p-4 text-white flex items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        `;

        el.appendChild(img);
        el.appendChild(overlay);

        // Clique → iframe
        el.addEventListener('click', () => {
            const iframe = document.createElement('iframe');

            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.className = 'aspect-video w-full';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;

            el.innerHTML = '';
            el.appendChild(iframe);
        });
    });
}



function loadModalIframes(container) {
    if (!container) return;

    container.querySelectorAll('iframe[data-src]').forEach(iframe => {
        if (!iframe.src) {
            iframe.src = iframe.dataset.src;
        }
    });
}

document.querySelectorAll('label[for$="-modal"]').forEach(label => {
    label.addEventListener('click', () => {
        const modalId = label.getAttribute('for');
        const modal = document.getElementById(modalId);

        if (!modal) return;

        const modalBox = modal.nextElementSibling;
        if (!modalBox) return;

        loadModalIframes(modalBox);
    });
});


document.querySelectorAll('input[type="radio"][name="resources"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (!radio.checked) return;

        const tabContent = radio.parentElement.nextElementSibling;
        if (!tabContent) return;

        initVideos(tabContent);
    });
});


let currentFilter = null;

function filterCards(category, button = null) {
    const cards = document.querySelectorAll('#tab-mbtl .card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
        btn.classList.remove('bg-primary', 'text-white');
    });

    if (currentFilter === category) {
        currentFilter = null;
    } else {
        currentFilter = category;

        if (button) {
            button.classList.add('bg-primary', 'text-white');
        }
    }

    cards.forEach(card => {
        const categories = card.getAttribute('data-category')?.split(' ') || [];

        if (
            !currentFilter ||
            currentFilter === 'all' ||
            categories.includes(currentFilter)
        ) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const defaultCategory = 'highlight';

    const defaultButton = document.querySelector(
        `.filter-btn[onclick*="${defaultCategory}"]`
    );

    filterCards(defaultCategory, defaultButton);
    initVideos();
});