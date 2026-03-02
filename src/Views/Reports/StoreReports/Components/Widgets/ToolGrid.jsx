import AlertIcon from "../../../../../assets/icons/Gradients/AlertIcon";
import TargetIcon from "../../../../../assets/icons/Gradients/TargetIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";






const ToolGrid = ({ title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="ReportTools" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
      <KpiGrid m="0">
        <KpiGrid.ActionItem icon={<svg fill="none" height="48" width="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2a3d8f"/>
      <stop offset="40%" stop-color="#1a2456"/>
      <stop offset="100%" stop-color="#0f1540"/>
    </linearGradient>
    <radialGradient id="glowTL" cx="18%" cy="18%" r="58%">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBR" cx="82%" cy="84%" r="52%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowOrange" cx="50%" cy="50%" r="55%">
      <stop offset="0%" stop-color="#ff6b35" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bellStroke" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#ff00ff"/>
    </linearGradient>
    <linearGradient id="bellFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e2f6e"/>
      <stop offset="100%" stop-color="#0a0e27"/>
    </linearGradient>
    <linearGradient id="bellHighlight" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6b35"/>
      <stop offset="50%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ff00ff"/>
    </linearGradient>
    <radialGradient id="clapperGrad" cx="35%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ff6b35"/>
    </radialGradient>
    <linearGradient id="knobGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <linearGradient id="waveL" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ff6b35" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="waveR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ff6b35" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#3a4a80" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.5"/>
    </linearGradient>
    <filter id="glowBell" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowRim" x="-30%" y="-80%" width="160%" height="260%">
      <feGaussianBlur stdDeviation="1.8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowClapper" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowKnob" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="1.8" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowWave" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="1.4" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#bgGrad)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTL)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowBR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowOrange)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" stroke="url(#borderGrad)" stroke-width="1" fill="none"/>


  <path d="M17.5 18.5 C15.5 20.5 15.5 24 17.5 26" stroke="url(#waveL)" stroke-width="1.8" stroke-linecap="round" fill="none" filter="url(#glowWave)"/>
  <path d="M15 16 C12 19 12 25 15 28" stroke="url(#waveL)" stroke-width="1.3" stroke-linecap="round" fill="none" filter="url(#glowWave)" opacity="0.45"/>

  <path d="M30.5 18.5 C32.5 20.5 32.5 24 30.5 26" stroke="url(#waveR)" stroke-width="1.8" stroke-linecap="round" fill="none" filter="url(#glowWave)"/>
  <path d="M33 16 C36 19 36 25 33 28" stroke="url(#waveR)" stroke-width="1.3" stroke-linecap="round" fill="none" filter="url(#glowWave)" opacity="0.45"/>

  <path d="
    M24 13
    C24 13 21 13 19.5 14.5
    C18 16 17.5 18 17.5 20.5
    C17.5 23 17 25 16 26.5
    C15.2 27.8 15 28.5 15 29
    L33 29
    C33 28.5 32.8 27.8 32 26.5
    C31 25 30.5 23 30.5 20.5
    C30.5 18 30 16 28.5 14.5
    C27 13 24 13 24 13 Z"
    fill="url(#bellFill)"
    stroke="url(#bellStroke)"
    stroke-width="1.8"
    stroke-linejoin="round"
    filter="url(#glowBell)"/>

  <path d="
    M24 13.5 C22.5 13.5 21.2 14.5 20.5 15.8
    C19.8 17 19.5 18.5 19.5 20.5
    C19.5 22 19.3 23.5 18.8 24.8
    L21 24.8
    C21.5 23.5 21.7 22 21.7 20.5
    C21.7 18.5 22 17.2 22.7 16
    C23.2 15 24 14.2 24 13.5 Z"
    fill="url(#bellHighlight)"/>

  <rect x="14" y="28.5" width="20" height="2.8" rx="1.4"
    fill="url(#rimGrad)" filter="url(#glowRim)"/>

  <path d="M22.5 13 C22.5 10.5 25.5 10.5 25.5 13"
    stroke="url(#knobGrad)" stroke-width="2" stroke-linecap="round" fill="none" filter="url(#glowKnob)"/>

  <line x1="24" y1="31.3" x2="24" y2="33.5" stroke="#ffd700" stroke-width="1.2" stroke-linecap="round" opacity="0.6"/>
  <circle cx="24" cy="35" r="2" fill="url(#clapperGrad)" filter="url(#glowClapper)"/>
  <circle cx="24" cy="35" r="0.75" fill="#0a0e27"/>
</svg>} label={"Alerts"} action="/report/stores/safe" onClick={onClick}/>
        <KpiGrid.ActionItem icon={<svg fill="none" height="48" width="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2a3d8f"/>
      <stop offset="40%" stop-color="#1a2456"/>
      <stop offset="100%" stop-color="#0f1540"/>
    </linearGradient>
    <radialGradient id="glowTL" cx="18%" cy="18%" r="58%">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#00ff88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowBR" cx="82%" cy="84%" r="52%">
      <stop offset="0%" stop-color="#a855f7" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowTR" cx="82%" cy="16%" r="45%">
      <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="outerRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
    <linearGradient id="midRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#ff00ff"/>
    </linearGradient>
    <linearGradient id="innerRing" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>

    <linearGradient id="crossH" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset="35%" stop-color="#00ff88"/>
      <stop offset="65%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="crossV" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0"/>
      <stop offset="35%" stop-color="#00ff88"/>
      <stop offset="65%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </linearGradient>

    <radialGradient id="centerDot" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#ff6b35"/>
    </radialGradient>

    <linearGradient id="borderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#3a4a80" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.5"/>
    </linearGradient>

    <filter id="glowOuter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowMid" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowInner" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowCross" x="-10%" y="-100%" width="120%" height="300%">
      <feGaussianBlur stdDeviation="1.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowCenter" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#bgGrad)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTL)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowBR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" stroke="url(#borderGrad)" stroke-width="1" fill="none"/>

  <circle cx="24" cy="24" r="13" fill="none" stroke="url(#outerRing)" stroke-width="1.5" filter="url(#glowOuter)"/>

  <circle cx="24" cy="24" r="9" fill="none" stroke="url(#midRing)" stroke-width="1.5" filter="url(#glowMid)"/>

  <circle cx="24" cy="24" r="5" fill="none" stroke="url(#innerRing)" stroke-width="1.5" filter="url(#glowInner)"/>

  <line x1="9" y1="24" x2="18" y2="24" stroke="url(#crossH)" stroke-width="1.2" stroke-linecap="round" filter="url(#glowCross)"/>
  <line x1="30" y1="24" x2="39" y2="24" stroke="url(#crossH)" stroke-width="1.2" stroke-linecap="round" filter="url(#glowCross)"/>

  <line x1="24" y1="9" x2="24" y2="18" stroke="url(#crossV)" stroke-width="1.2" stroke-linecap="round" filter="url(#glowCross)"/>
  <line x1="24" y1="30" x2="24" y2="39" stroke="url(#crossV)" stroke-width="1.2" stroke-linecap="round" filter="url(#glowCross)"/>

  <line x1="24" y1="9.5" x2="24" y2="12" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  <line x1="24" y1="36" x2="24" y2="38.5" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  <line x1="9.5" y1="24" x2="12" y2="24" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  <line x1="36" y1="24" x2="38.5" y2="24" stroke="#a855f7" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>

  <circle cx="24" cy="24" r="2.5" fill="url(#centerDot)" filter="url(#glowCenter)"/>
  <circle cx="24" cy="24" r="0.9" fill="#0a0e27"/>
</svg>} label={"Targets"} action="/report/stores/safe" onClick={onClick}/>
      </KpiGrid>
    </>
  );
}

export default ToolGrid;