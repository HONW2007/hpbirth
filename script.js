const progress = document.querySelector('.progress');
const percentage = document.querySelector('.percentage');
const nextBtn = document.querySelector('.next-btn');
const pig = document.querySelector('.pig');
const loadingContainer = document.querySelector('.loading-container');
const loadingBar = document.querySelector('.loading-bar');

let width = 0;
const duration = 3000; // 3 giây
const interval = 50; // Cập nhật mỗi 50ms
const increment = (100 / (duration / interval));

// Thanh loading và con lợn chạy
const loading = setInterval(() => {
    width += increment;
    if (width >= 100) {
        width = 100;
        clearInterval(loading);
        nextBtn.style.display = 'block'; // Hiển thị nút khi hoàn thành
        loadingContainer.classList.add('loading-complete'); // Dừng con lợn
        pig.style.left = `${loadingBar.offsetWidth - pig.offsetWidth}px`; // Đặt con lợn ở cuối
    } else {
        // Di chuyển con lợn theo tiến trình
        const maxLeft = loadingBar.offsetWidth - pig.offsetWidth; // Giới hạn bên phải
        const newLeft = (width / 100) * maxLeft; // Tính vị trí mới
        pig.style.left = `${newLeft}px`;
    }
    
    progress.style.width = `${width}%`;
    percentage.textContent = `${Math.round(width)}%`;
}, interval);