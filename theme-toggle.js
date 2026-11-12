(function() {
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var icon = btn.querySelector('span');
    var saved = localStorage.getItem('theme') || 'dark';
    icon.textContent = saved === 'light' ? '🌙' : '☀️';
    btn.addEventListener('click', function() {
        var current = document.documentElement.getAttribute('data-theme');
        var next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        icon.textContent = next === 'light' ? '🌙' : '☀️';
        localStorage.setItem('theme', next);
    });
})();
