import { useState, useEffect } from 'react';

export default function MusicButton({ inviteRef, audioRef, playing, setPlaying }) {
  const [btnStyle, setBtnStyle] = useState({ right: 14, top: 14 });

  useEffect(() => {
    function updatePosition() {
      if (!inviteRef.current) return;
      const rect = inviteRef.current.getBoundingClientRect();
      if (window.innerWidth > 560) {
        // Pin to top-right corner of invite card
        setBtnStyle({ right: window.innerWidth - rect.right + 16, top: 18 });
      } else {
        setBtnStyle({ right: 14, top: 14 });
      }
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [inviteRef]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <button
      className={`mfloat${playing ? ' playing' : ''}`}
      style={btnStyle}
      onClick={toggle}
      aria-label="Música"
    >
      <span /><span /><span /><span />
    </button>
  );
}
