import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80vh] flex-col justify-center pt-32 pb-20">
      <p className="label text-stone">404 · Page not found</p>
      <h1 className="display mt-6 max-w-[14ch] text-[clamp(3rem,9vw,8rem)]">
        This page didn&apos;t <span className="text-stone">get found.</span>
      </h1>
      <p className="lede mt-6 max-w-lg text-stone">Unlike your business will. The link may be old, or the page may have moved.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/work" variant="ghost">See our work</Button>
      </div>
    </section>
  );
}
