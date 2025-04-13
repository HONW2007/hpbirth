document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn'); // Nút mới
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');

    // Danh sách 5 bài hát
    const songs = [
        { src: 'music/why.mp3', title: 'Why?' },
        { src: 'music/way.mp3', title: 'WAY 4 LUV' },
        { src: 'music/1232.mp3', title: '12:32 (A to T)' },
        { src: 'music/island.mp3', title: 'Island' }, // Bài hát mới
        { src: 'music/chroma.mp3', title: 'Chroma Drift' }  // Bài hát mới
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let isRepeating = false;

    // Định dạng thời gian (mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Load bài hát
    function loadSong(index) {
        try {
            audio.src = songs[index].src;
            document.querySelector('h2').textContent = songs[index].title;
            audio.addEventListener('loadedmetadata', () => {
                progressBar.max = audio.duration || 0;
                durationEl.textContent = formatTime(audio.duration);
                progressBar.value = 0;
                currentTimeEl.textContent = '0:00';
            }, { once: true });
        } catch (err) {
            console.error(`Không tìm thấy bài hát ${index + 1}: ${songs[index].title}`);
            nextSong(); // Chuyển bài tiếp theo nếu lỗi
        }
    }

    // Cập nhật thanh tiến trình
    function updateProgress() {
        progressBar.value = audio.currentTime;
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }

    // Phát hoặc tạm dừng
    function togglePlay() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audio.play().catch(err => {
                console.error('Lỗi phát nhạc:', err);
                isPlaying = false;
                playBtn.textContent = '▶️';
            });
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playBtn.textContent = '▶️';
        }
    }

    // Chuyển bài trước
    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(err => console.error('Lỗi phát nhạc:', err));
        }
    }

    // Chuyển bài sau
    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play().catch(err => console.error('Lỗi phát nhạc:', err));
        }
    }

    // Lặp lại
    function toggleRepeat() {
        isRepeating = !isRepeating;
        audio.loop = isRepeating;
        repeatBtn.classList.toggle('active', isRepeating);
    }

    // Tua nhạc
    progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
        updateProgress();
    });

    // Cập nhật tiến trình theo thời gian thực
    audio.addEventListener('timeupdate', updateProgress);

    // Tự động chuyển bài khi kết thúc
    audio.addEventListener('ended', () => {
        if (!isRepeating) {
            nextSong();
        }
    });

    // Sự kiện cho các nút
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    backBtn.addEventListener('click', () => {
        window.location.href = 'mk.html'; // Chuyển hướng đến mk.html
    });

    // Load bài hát đầu tiên
    loadSong(currentSongIndex);
});