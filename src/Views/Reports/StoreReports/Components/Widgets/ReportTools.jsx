import SaveIcon from "../../../../../assets/icons/Gradients/SaveIcon";
import SummaryIcon from "../../../../../assets/icons/Gradients/SummaryIcon";
import KpiGrid from "../../../../../Components/Grids/KpiGrid";

import View from "../../../../Templates/View/View";


const ReportToolsButtonGrid = ({title,onClick }) => {

  return (
    <>
      <View.SectionTitle id="ReportToolsButtonGrid" m='2rem 0 .5rem 0'>{title}</View.SectionTitle>
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
    <radialGradient id="glowTR" cx="82%" cy="16%" r="45%">
      <stop offset="0%" stop-color="#00d4ff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#00d4ff" stop-opacity="0"/>
    </radialGradient>

    <linearGradient id="line1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <linearGradient id="line2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#ff00ff"/>
    </linearGradient>
    <linearGradient id="line3" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <linearGradient id="dotGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#3a4a80" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.5"/>
    </linearGradient>

    <filter id="glow1" x="-50%" y="-100%" width="200%" height="300%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow2" x="-50%" y="-100%" width="200%" height="300%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glow3" x="-50%" y="-100%" width="200%" height="300%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowDot" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

 
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#bgGrad)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTL)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowBR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" stroke="url(#borderGrad)" stroke-width="1" fill="none"/>

  
  <rect x="10" y="14" width="28" height="3.5" rx="1.75" fill="url(#line1)" filter="url(#glow1)"/>

  
  <rect x="10" y="21.25" width="28" height="3.5" rx="1.75" fill="url(#line2)" filter="url(#glow2)"/>


  <rect x="10" y="28.5" width="18" height="3.5" rx="1.75" fill="url(#line3)" filter="url(#glow3)"/>


  <circle cx="37" cy="30.25" r="4" fill="url(#dotGrad)" filter="url(#glowDot)"/>
  <polyline points="35,30.25 36.5,31.9 39.2,28.6"
    stroke="#0a0e27" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>} label={"Summary"} action="/report/stores/safe" onClick={onClick}/>
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

    <linearGradient id="floppyBody" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e2f6e"/>
      <stop offset="100%" stop-color="#0f1540"/>
    </linearGradient>

    <linearGradient id="label1" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>
    <linearGradient id="label2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ff6b35"/>
      <stop offset="100%" stop-color="#ff00ff"/>
    </linearGradient>
    <linearGradient id="label3" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#00d4ff"/>
    </linearGradient>

    <radialGradient id="hubGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="50%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </radialGradient>

    <linearGradient id="bottomBar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#00ff88"/>
      <stop offset="50%" stop-color="#00d4ff"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>

    <linearGradient id="borderGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.55"/>
      <stop offset="50%" stop-color="#3a4a80" stop-opacity="0.7"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.5"/>
    </linearGradient>

    <linearGradient id="diskBorder" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ff88" stop-opacity="0.7"/>
      <stop offset="50%" stop-color="#00d4ff" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#a855f7" stop-opacity="0.7"/>
    </linearGradient>

    <filter id="glowLabel1" x="-40%" y="-120%" width="180%" height="340%">
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowLabel2" x="-40%" y="-120%" width="180%" height="340%">
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowLabel3" x="-40%" y="-120%" width="180%" height="340%">
      <feGaussianBlur stdDeviation="1.6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowHub" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowBar" x="-40%" y="-100%" width="180%" height="300%">
      <feGaussianBlur stdDeviation="2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="glowDisk" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="1.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#bgGrad)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTL)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowBR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" fill="url(#glowTR)"/>
  <path d="M24 2 C36 2,46 6,46 24 C46 42,36 46,24 46 C12 46,2 42,2 24 C2 6,12 2,24 2 Z" stroke="url(#borderGrad)" stroke-width="1" fill="none"/>

  <rect x="12" y="10" width="24" height="24" rx="2.5" fill="url(#floppyBody)" stroke="url(#diskBorder)" stroke-width="1.2" filter="url(#glowDisk)"/>

  <rect x="14.5" y="11.5" width="13" height="9" rx="1.5" fill="#0a0e27" stroke="#2a3463" stroke-width="0.75"/>

  <rect x="16" y="13" width="10" height="2" rx="1" fill="url(#label1)" filter="url(#glowLabel1)"/>
  <rect x="16" y="16" width="7.5" height="2" rx="1" fill="url(#label2)" filter="url(#glowLabel2)"/>
  <rect x="16" y="14.5" width="0" height="0"/>

  <rect x="26" y="11.5" width="3.5" height="6" rx="1" fill="#141a3d" stroke="#2a3463" stroke-width="0.75"/>
  <rect x="26.5" y="12.5" width="2.5" height="1.5" rx="0.75" fill="#a855f7" opacity="0.6"/>

  <circle cx="24" cy="27" r="4.5" fill="#0a0e27" stroke="#2a3463" stroke-width="0.75"/>
  <circle cx="24" cy="27" r="2" fill="url(#hubGrad)" filter="url(#glowHub)"/>
  <circle cx="24" cy="27" r="0.8" fill="#0a0e27"/>

  <rect x="13" y="30.5" width="22" height="2.5" rx="0" fill="#0a0e27" stroke="none"/>
  <rect x="14.5" y="31" width="19" height="1.5" rx="0.75" fill="url(#label3)" filter="url(#glowLabel3)" opacity="0.8"/>

  <rect x="15" y="37" width="18" height="2.8" rx="1.4" fill="url(#bottomBar)" filter="url(#glowBar)"/>
</svg>} label={"Save Report"} action="save" onClick={onClick}/>
      </KpiGrid>
    </>
  );
}

export default ReportToolsButtonGrid;