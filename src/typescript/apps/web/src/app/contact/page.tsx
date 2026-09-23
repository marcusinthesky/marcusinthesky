import type { Metadata } from "next";

import { profile } from "@marcusinthesky/content";
import { ButtonLink, Card } from "@marcusinthesky/ui";

import { PageHero } from "@/components/page-hero";
import { BrandIcon } from "@/components/brand-icon";

export const metadata: Metadata = {
  title: "Contact",
  description: "Public channels for contacting Marcus Gawronsky.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  const links = profile.links.filter(({ label }) => ["GitHub", "LinkedIn"].includes(label));
  return (
    <div className="page-shell">
      <PageHero
        description="For professional, research, and open-source conversations, use one of the public channels below. Direct personal contact details are intentionally not published."
        eyebrow="Contact"
        title="Start with public context"
      />
      <section className="grid max-w-3xl gap-5 border-t border-border py-14 sm:grid-cols-2">
        {links.map((link) => (
          <Card key={link.url}>
            <h2 className="font-serif text-2xl">{link.label}</h2>
            <p className="mt-3 text-muted-foreground">
              {link.label === "LinkedIn"
                ? "Professional introductions and collaboration."
                : "Open-source work, technical context, and repository discussions."}
            </p>
            <ButtonLink className="mt-6 gap-2" href={link.url}>
              <BrandIcon className="size-4" label={link.label} />
              Open {link.label}
            </ButtonLink>
          </Card>
        ))}
      </section>
    </div>
  );
}
