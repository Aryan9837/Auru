import { prisma } from "@/lib/prisma";
import { SectionCarousel } from "@/components/section-carousel";
import { ForYouCard } from "@/components/for-you-card";
import { SceneCard } from "@/components/scene-card";
import { FeaturedCard } from "@/components/featured-card";

export default async function ChatPage() {
  const characters = await prisma.character.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      tagline: true,
      description: true,
      avatarUrl: true,
    },
  });

  const forYou = characters.slice(0, 5);
  const scenes = characters.slice(5, 9);
  const featured = characters.slice(9, 12);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        <SectionCarousel title="For you">
          {forYou.map((c) => (
            <ForYouCard
              key={c.id}
              id={c.id}
              name={c.name}
              tagline={c.tagline}
              avatarUrl={c.avatarUrl}
            />
          ))}
        </SectionCarousel>

        {scenes.length > 0 && (
          <SectionCarousel title="Scenes">
            {scenes.map((c) => (
              <SceneCard
                key={c.id}
                id={c.id}
                name={c.name}
                tagline={c.tagline}
                avatarUrl={c.avatarUrl}
              />
            ))}
          </SectionCarousel>
        )}

        {featured.length > 0 && (
          <SectionCarousel title="Featured">
            {featured.map((c) => (
              <FeaturedCard
                key={c.id}
                id={c.id}
                name={c.name}
                tagline={c.tagline}
                description={c.description}
                avatarUrl={c.avatarUrl}
              />
            ))}
          </SectionCarousel>
        )}
      </div>
    </div>
  );
}
