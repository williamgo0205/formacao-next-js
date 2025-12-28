import { LandingPage } from "@/templates/landing-page";

import { allPosts } from 'contentlayer/generated';

export default function HomePage() {
  console.log(allPosts)
  return (
    <LandingPage />
  );
}
