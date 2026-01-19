/**
 * About Us Page - MCNAB VENTURES
 */

import SecondaryHero from '@/components/sections/SecondaryHero';
import { DrivenByProgress, GetHighlights, JoinOurTeam, OurJourney, StayInTheLoop, WhoWeAre } from '@/components/sections';
import { ourIndustriesData } from '@/data';

export default function AboutUs() {
    return (
        <main className="min-h-screen">
            <SecondaryHero />
            <WhoWeAre />
            <GetHighlights
                title={ourIndustriesData.title}
                items={ourIndustriesData.items}
                variant="industry"
            />
            <OurJourney />
            <DrivenByProgress />
            <StayInTheLoop title='Latest News' />
            <JoinOurTeam />
        </main>
    );
}
