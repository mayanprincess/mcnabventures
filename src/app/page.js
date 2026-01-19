/**
 * Home Page - MCNAB VENTURES
 * 
 * Main landing page featuring the PrimaryHero slider
 * and other homepage components.
 */

import PrimaryHero from '@/components/sections/PrimaryHero';
import MissionStatement from '@/components/sections/MissionStatement';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Primary Hero Section - Full screen video */}
      <PrimaryHero />
      
      {/* Mission Statement Section */}
      <MissionStatement />
      
      {/* Additional homepage sections will be added here */}
    </main>
  );
}
