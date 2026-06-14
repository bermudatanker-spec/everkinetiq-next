import { sanityClient } from "@/lib/sanity.client";
import { postsQuery } from "@/lib/sanity.queries";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await sanityClient.fetch(postsQuery);

  return (
    <main className="mx-auto max-w-4xl px-4 py-24">
      <h1 className="mb-8 text-3xl font-semibold">Blog</h1>

      <div className="space-y-6">
        {posts.map((post: any) => (
          <article key={post._id} className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            {post.excerpt && <p className="mt-2 text-sm opacity-80">{post.excerpt}</p>}
            <Link
              href={`/blog/${post.slug.current}`}
              className="mt-4 inline-block text-sm font-semibold text-blue-600"
            >
              Lees meer →
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}