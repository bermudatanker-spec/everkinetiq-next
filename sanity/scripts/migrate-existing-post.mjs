import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "rf3m18jt",
  dataset: "production",
  apiVersion: "2026-01-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const query = `
*[_type == "post"]{
  _id,
  title,
  excerpt,
  body
}
`;

const run = async () => {
  const posts = await client.fetch(query);

  for (const post of posts) {
    const patch = {};

    // title: string -> { nl: string }
    if (typeof post.title === "string") {
      patch.title = { nl: post.title };
    }

    // excerpt: string -> { nl: string }
    if (typeof post.excerpt === "string") {
      patch.excerpt = { nl: post.excerpt };
    }

    // body: array -> { nl: array }
    if (Array.isArray(post.body)) {
      patch.body = { nl: post.body };
    }

    if (Object.keys(patch).length > 0) {
      await client
        .patch(post._id)
        .set(patch)
        .commit({ autoGenerateArrayKeys: true });

      console.log("✅ Migrated:", post._id);
    }
  }

  console.log("🎉 Migratie klaar");
};

run().catch(console.error);