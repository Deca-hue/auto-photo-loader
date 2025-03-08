const galleryContainer = document.getElementById('gallery-container');
const loadingIndicator = document.getElementById('loading');
const categorySelect = document.getElementById('category-select');
const popup = document.getElementById('popup');
let loading = false;

const showPopup = (message) => {
    popup.innerText = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 2000);
};

const loadImages = (count = 6) => {
    loading = true;
    loadingIndicator.style.display = 'block';
    const category = categorySelect.value;
    
    setTimeout(() => {
        for (let i = 0; i < count; i++) {
            const imgWrapper = document.createElement('div');
            imgWrapper.className = 'relative w-full rounded-2xl shadow-lg overflow-hidden fade-in hover:scale-105 hover:shadow-2xl transition-transform duration-300';

            const img = document.createElement('img');
            img.src = `https://picsum.photos/800/1200?random=${Date.now()}-${i}`;
            img.alt = `Random ${category} Image ${i}`;
            img.className = 'w-full h-auto object-cover';

            const caption = document.createElement('div');
            caption.innerText = img.alt;
            caption.className = 'absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2';

            const likeButton = document.createElement('button');
            likeButton.innerText = '❤️ Like';
            likeButton.className = 'like-button';
            likeButton.onclick = () => showPopup('Image liked!');

            const saveButton = document.createElement('button');
            saveButton.innerText = '💾 Save';
            saveButton.className = 'save-button';
            saveButton.onclick = () => showPopup('Image saved successfully!');

            img.onload = () => {
                imgWrapper.classList.add('visible');
            };
            
            imgWrapper.appendChild(img);
            imgWrapper.appendChild(caption);
            imgWrapper.appendChild(likeButton);
            imgWrapper.appendChild(saveButton);
            galleryContainer.appendChild(imgWrapper);
        }
        loading = false;
        loadingIndicator.style.display = 'none';
    }, 1000);
};

const handleScroll = () => {
    if (!loading && window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadImages();
    }
};

categorySelect.addEventListener('change', () => {
    galleryContainer.innerHTML = '';
    loadImages();
});

window.addEventListener('scroll', handleScroll);

loadImages();

window.onload = () => {
    const typingText = document.querySelector('.typing-text');
    typingText.style.display = 'inline-block';
};

// (Rest of your JavaScript remains the same)