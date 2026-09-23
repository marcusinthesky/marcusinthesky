import { z } from "zod";

const url = z.url();

const linkSchema = z.object({
  label: z.string().min(1),
  url,
});

export const profileSchema = z.object({
  name: z.string().min(1),
  givenName: z.string().min(1),
  familyName: z.string().min(1),
  headline: z.string().min(1),
  summary: z.string().min(1),
  location: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1),
  interests: z.array(z.string().min(1)).min(1),
  links: z.array(linkSchema).min(1),
});

export const publicationSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  authors: z.array(z.string().min(1)).min(1),
  year: z.number().int(),
  status: z.string().min(1),
  /** The question the paper asks, in one sentence. */
  lede: z.string().min(1).optional(),
  summary: z.string().min(1),
  keywords: z.array(z.string().min(1)),
  links: z.array(linkSchema).min(1),
});

export const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  /** The question or claim the project answers, in one sentence. */
  lede: z.string().min(1).optional(),
  summary: z.string().min(1),
  narrative: z.array(z.string().min(1)).min(1),
  role: z.string().min(1),
  technologies: z.array(z.string().min(1)),
  featured: z.boolean(),
  links: z.array(linkSchema).min(1),
});

export const writingSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(1),
  source: z.string().min(1),
  publishedAt: z.iso.date(),
  canonicalUrl: url,
  local: z.boolean().default(false),
});

export const experienceSchema = z.object({
  organization: z.string().min(1),
  role: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
  highlights: z.array(z.string().min(1)).min(1),
});

export const educationSchema = z.object({
  institution: z.string().min(1),
  qualification: z.string().min(1),
  period: z.string().min(1),
  summary: z.string().min(1),
});

export type Link = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Publication = z.infer<typeof publicationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Writing = z.infer<typeof writingSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
