/**
 * Home Page - MCNAB VENTURES
 * 
 * Main landing page featuring the PrimaryHero slider
 * and other homepage components.
 */

import PrimaryHero from '@/components/sections/PrimaryHero';
import MissionStatement from '@/components/sections/MissionStatement';
import OurPartners from '@/components/sections/OurPartners';
import GroupSnapshot from '@/components/sections/GroupSnapshot';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Primary Hero Section - Full screen video */}
      <PrimaryHero />
      
      {/* Mission Statement Section */}
      <MissionStatement />

      {/* Group Snapshot Section */}
      <GroupSnapshot />

      {/* Our Partners Section */}
      <OurPartners />
      
      {/* Additional homepage sections will be added here */}
    </main>
  );
}
