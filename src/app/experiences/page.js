import { ExperiencesGallery, SustainabilityInAction, SecondaryHero, MissionStatement, TheExperiences } from '@/components/sections';

export default function Experiences() {
    return (
        <main className="min-h-screen">
            <SecondaryHero />
            <MissionStatement vectorType="vector2" />
            <TheExperiences />
            <ExperiencesGallery />
            <SustainabilityInAction />
        </main>
    );
}
