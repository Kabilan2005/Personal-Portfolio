document.querySelectorAll('[data-copy]').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', function() {
    const text = this.getAttribute('data-copy');
    
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${text}`);
    }).catch(() => {
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast(`Copied ${text}`);
    });
  });
});

function showToast(msg) {
  document.querySelectorAll('.copy-toast').forEach(t => t.remove());
  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed; bottom:40px; left:50%; transform:translateX(-50%);
    background:rgba(10,15,35,0.95); color:var(--neon-blue);
    padding:14px 36px; border-radius:50px; font-weight:600;
    border:1px solid var(--neon-blue); backdrop-filter:blur(16px);
    font-size:15px; z-index:99999; box-shadow:0 10px 40px rgba(0,200,255,0.3);
    animation:toast 2.8s forwards;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes toast {
    0%,100% {opacity:0; transform:translateX(-50%) translateY(20px)}
    15%,85% {opacity:1; transform:translateX(-50%) translateY(0)}
  }
`;
document.head.appendChild(style);
