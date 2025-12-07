document.getElementById('contactBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const user = this.getAttribute('data-user');
    const domain = this.getAttribute('data-domain');
    window.location.href = `mailto:${user}@${domain}`;
});