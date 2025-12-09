(function(){
      const canvas = document.getElementById('starfield');
      const ctx = canvas.getContext('2d');
      let stars = [];
      let w, h, dpi = window.devicePixelRatio || 1;

      function resize(){
        w = canvas.width = Math.floor(window.innerWidth * dpi);
        h = canvas.height = Math.floor(window.innerHeight * dpi);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        initStars();
      }

      function initStars(){
        stars = [];
        const count = Math.floor((w*h) / 80000)+300;
        for(let i=0;i<count;i++){
          stars.push({
            x: Math.random()*w,
            y: Math.random()*h,
            z: Math.random()*0.8+0.2,
            dx: (Math.random()-0.5)*0.02,
            size: Math.random()*1.2+0.3
          });
        }
      }

      function render(){
        ctx.clearRect(0,0,w,h);
        for(const s of stars){
          s.x += s.dx * (s.z*6);
          s.y += (Math.sin((s.x+s.y)/1000))*0.1;

          if(s.x > w+50) s.x = -50;
          if(s.x < -50) s.x = w+50;
          if(s.y > h+50) s.y = -50;
          if(s.y < -50) s.y = h+50;

          const alpha = 0.6 * s.z;
          const size = s.size * s.z * dpi;

          ctx.beginPath();
          ctx.fillStyle = 'rgba(255,255,255,'+alpha+')';
          ctx.arc(s.x, s.y, size, 0, Math.PI*2);
          ctx.fill();
        }
        requestAnimationFrame(render);
      }

      window.addEventListener('resize', resize);
      resize();
      render();
})();

