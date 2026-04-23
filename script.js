
function loadIframes(container) {
    if (!container) return;

    const iframes = container.querySelectorAll('iframe[data-src]');

    iframes.forEach(iframe => {
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

        loadIframes(modalBox);
    });
});


document.querySelectorAll('input[type="radio"][name="resources"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (!radio.checked) return;

        const tabContent = radio.parentElement.nextElementSibling;
        if (!tabContent) return;

        loadIframes(tabContent);
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

        if (!currentFilter || categories.includes(currentFilter)) {
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
});