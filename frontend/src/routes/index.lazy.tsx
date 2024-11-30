import { Footer } from "@/components/footer";
import { LandingPage } from "@/components/landing-page";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Navbar } from "@/components/navbar";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <MaxWidthWrapper>
        <Navbar />
      </MaxWidthWrapper>
      <LandingPage />
      <Footer />
    </>
  );
}
