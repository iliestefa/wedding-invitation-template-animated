export default function SvgDefs() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <defs>
        <radialGradient id="g1" cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor="#c6cfa8" />
          <stop offset="1" stopColor="#7c885a" />
        </radialGradient>
        <radialGradient id="g2" cx="38%" cy="28%" r="80%">
          <stop offset="0" stopColor="#b3c193" />
          <stop offset="1" stopColor="#6c7a47" />
        </radialGradient>
        <radialGradient id="g3" cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#d2d9b8" />
          <stop offset="1" stopColor="#8d9869" />
        </radialGradient>
        <radialGradient id="gw" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor="#9fb07f" stopOpacity=".85" />
          <stop offset="1" stopColor="#9fb07f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="gs" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8c9663" />
          <stop offset="1" stopColor="#5f6a3e" />
        </linearGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" />
        </filter>

        <g id="lp1">
          <path d="M0 0C4 -4.2 4 -12 0 -16.5C-4 -12 -4 -4.2 0 0Z" fill="url(#g1)" />
          <path d="M0 -2.5L0 -13.5" stroke="#5d6a3c" strokeWidth=".6" strokeOpacity=".4" fill="none" />
        </g>
        <g id="lp2">
          <path d="M0 0C4 -4.2 4 -12 0 -16.5C-4 -12 -4 -4.2 0 0Z" fill="url(#g2)" />
          <path d="M0 -2.5L0 -13.5" stroke="#4f5b32" strokeWidth=".6" strokeOpacity=".4" fill="none" />
        </g>
        <g id="lp3">
          <path d="M0 0C4.4 -4.4 4.4 -12.5 0 -17.5C-4.4 -12.5 -4.4 -4.4 0 0Z" fill="url(#g3)" />
          <path d="M0 -2.5L0 -14" stroke="#6a764a" strokeWidth=".6" strokeOpacity=".4" fill="none" />
        </g>

        <g id="branch">
          <path d="M0 0 Q 56 -8 112 -20" fill="none" stroke="url(#gs)" strokeWidth="1.7" strokeLinecap="round" />
          <use href="#lp1" transform="translate(16.8 -2.5) rotate(-38) scale(1)" />
          <use href="#lp2" transform="translate(16.8 -2.5) rotate(158) scale(.82)" />
          <use href="#lp3" transform="translate(33.6 -5.2) rotate(-20) scale(1.05)" />
          <use href="#lp1" transform="translate(33.6 -5.2) rotate(178) scale(.9)" />
          <use href="#lp2" transform="translate(50.4 -8) rotate(-30) scale(1)" />
          <use href="#lp3" transform="translate(50.4 -8) rotate(165) scale(.95)" />
          <use href="#lp1" transform="translate(67.2 -11) rotate(-15) scale(1.05)" />
          <use href="#lp2" transform="translate(67.2 -11) rotate(188) scale(.88)" />
          <use href="#lp3" transform="translate(84 -14.2) rotate(-26) scale(.95)" />
          <use href="#lp1" transform="translate(84 -14.2) rotate(170) scale(.84)" />
          <use href="#lp2" transform="translate(100.8 -17.6) rotate(-12) scale(.9)" />
          <use href="#lp3" transform="translate(100.8 -17.6) rotate(196) scale(.8)" />
          <use href="#lp1" transform="translate(112 -20) rotate(-6) scale(.78)" />
          <circle cx="113" cy="-23" r="2.1" fill="url(#g3)" />
          <circle cx="116" cy="-20" r="1.9" fill="url(#g2)" />
          <circle cx="111" cy="-25" r="1.7" fill="url(#g1)" />
          <circle cx="40" cy="-2" r="1.7" fill="url(#g3)" />
          <circle cx="43" cy="0" r="1.5" fill="url(#g2)" />
        </g>

        <g id="garland">
          <ellipse cx="70" cy="34" rx="92" ry="60" fill="url(#gw)" filter="url(#soft)" />
          <use href="#branch" transform="translate(-10 -2) rotate(-8) scale(.82)" />
          <use href="#branch" transform="translate(-6 -4) rotate(16) scale(1.06)" />
          <use href="#branch" transform="translate(-2 8) rotate(46) scale(1)" />
          <use href="#branch" transform="translate(2 18) rotate(76) scale(.86)" />
          <use href="#branch" transform="translate(0 30) rotate(104) scale(.7)" />
        </g>

        <symbol id="ic-rings" viewBox="0 0 34 34">
          <ellipse cx="13" cy="21" rx="7.2" ry="7.8" />
          <ellipse cx="22" cy="21" rx="7.2" ry="7.8" />
          <path d="M22 7 L24.5 10.5 L22 14 L19.5 10.5 Z" />
          <path d="M7 6.5 L7.8 9.2 L10.5 10 L7.8 10.8 L7 13.5 L6.2 10.8 L3.5 10 L6.2 9.2 Z" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="ic-cheers" viewBox="0 0 34 34">
          <path d="M8 7 L12 17 L13 8" />
          <path d="M12 17 V26 M9 27 H15" />
          <path d="M26 7 L22 17 L21 8" />
          <path d="M22 17 V26 M19 27 H25" />
          <circle cx="15" cy="11" r=".9" />
          <circle cx="19" cy="13" r=".8" />
          <path d="M17 3.5 L17.7 5.8 L20 6.5 L17.7 7.2 L17 9.5 L16.3 7.2 L14 6.5 L16.3 5.8 Z" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="ic-dance" viewBox="0 0 34 34">
          <path d="M13 8 V20" />
          <ellipse cx="10.5" cy="20.3" rx="2.7" ry="2.1" fill="currentColor" stroke="none" />
          <path d="M13 8 C17 9 17 12.6 14.4 13.6" />
          <path d="M21 6 V18" />
          <ellipse cx="18.5" cy="18.3" rx="2.7" ry="2.1" fill="currentColor" stroke="none" />
          <path d="M21 6 C25 7 25 10.6 22.4 11.6" />
          <path d="M27 21 C25.9 18.8 22.8 19.4 24.4 22 L27 24.7 L29.6 22 C31.2 19.4 28.1 18.8 27 21 Z" fill="currentColor" stroke="none" />
        </symbol>
        <symbol id="ic-dinner" viewBox="0 0 34 34">
          <circle cx="18" cy="18" r="8.6" />
          <circle cx="18" cy="18" r="5" />
          <path d="M6 8 V13 M8 8 V13 M10 8 V13 M6 13 H10 M8 13 V27" />
          <path d="M27 8 C29.6 9 29.6 15 26.6 16.6 V27" />
        </symbol>
        <symbol id="ic-party" viewBox="0 0 34 34">
          <path d="M17 4 V7.4" />
          <circle cx="17" cy="16.5" r="9" />
          <path d="M8 16.5 H26 M9.6 11.6 H24.4 M9.6 21.4 H24.4" />
          <path d="M17 7.6 V25.4 M12.3 8.6 V24.4 M21.7 8.6 V24.4" />
          <path d="M5 8 L5.7 10 L7.7 10.7 L5.7 11.4 L5 13.4 L4.3 11.4 L2.3 10.7 L4.3 10 Z" fill="currentColor" stroke="none" />
          <path d="M29 10 L29.6 11.7 L31.3 12.3 L29.6 12.9 L29 14.6 L28.4 12.9 L26.7 12.3 L28.4 11.7 Z" fill="currentColor" stroke="none" />
          <path d="M7 27 L7.6 28.7 L9.3 29.3 L7.6 29.9 L7 31.6 L6.4 29.9 L4.7 29.3 L6.4 28.7 Z" fill="currentColor" stroke="none" />
        </symbol>
      </defs>
    </svg>
  );
}
