import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="font-heading font-bold text-7xl text-accent mb-4">
          404
        </h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oeps! Pagina niet gevonden
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-foreground font-heading font-semibold hover:shadow-[0_0_30px_hsl(43_74%_53%/0.4)] transition-all duration-300"
        >
          Terug naar Home
        </Link>
      </div>
    </div>
  );
}