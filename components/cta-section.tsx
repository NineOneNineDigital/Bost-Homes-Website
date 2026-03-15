import Link from "next/link";
import { Button } from "@/components/ui/button";

function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-bost-olive">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 lg:flex-row lg:justify-between lg:py-24">
        {/* Text + CTA */}
        <div className="flex max-w-lg flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <h2 className="font-bold text-3xl text-white tracking-tight sm:text-4xl">
            Ready to Build Your Dream Home?
          </h2>
          <p className="text-lg text-white/60">
            Let&apos;s bring your vision to life. Start the conversation with
            our team today.
          </p>
          <Button
            className="bg-bost-brick text-white hover:bg-bost-brick/90"
            render={<Link href="/contact" />}
            size="lg"
          >
            Start a Project
          </Button>
        </div>

        {/* House illustration placeholder */}
        <div aria-hidden="true" className="hidden lg:block">
          <svg
            className="h-56 w-72 text-white/10"
            fill="currentColor"
            viewBox="0 0 288 224"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M144 16L8 120h40v88h72v-56h48v56h72v-88h40L144 16z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export { CtaSection };
