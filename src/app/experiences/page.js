import { ExperiencesGallery, SustainabilityInAction, SecondaryHero, MissionStatement } from '@/components/sections';

export default function Experiences() {
    return (
        <main className="min-h-screen">
            <SecondaryHero />
            <MissionStatement />
            <ExperiencesGallery />
            <SustainabilityInAction />
        </main>
    );
}
