document.addEventListener('DOMContentLoaded', () => {
    const disk = document.getElementById('disk');
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('playBtn');
    const repeatBtn = document.getElementById('repeatBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
   
    // Chỉ một bài hát
    const song = {
        src: 'music/nonhaumotloi.mp3',
        title: 'Nợ bạn 1 lời'
    };

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
    function loadSong() {
        try {
            audio.src = song.src;
            document.querySelector('h2').textContent = song.title;
            audio.addEventListener('loadedmetadata', () => {
                progressBar.max = audio.duration || 0;
                durationEl.textContent = formatTime(audio.duration);
                progressBar.value = 0;
                currentTimeEl.textContent = '0:00';
            }, { once: true });
        } catch (err) {
            console.error(`Không tìm thấy bài hát: ${song.title}`);
            playBtn.disabled = true;
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
                disk.classList.remove('rotate');
            });
            disk.classList.add('rotate');
            playBtn.textContent = '⏸️';
        } else {
            audio.pause();
            disk.classList.remove('rotate');
            playBtn.textContent = '▶️';
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

    // Sự kiện cho các nút
    playBtn.addEventListener('click', togglePlay);
    repeatBtn.addEventListener('click', toggleRepeat);

    // Load bài hát
    loadSong();
});