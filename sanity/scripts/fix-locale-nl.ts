import { getCliClient } from "sanity/cli";

const client = getCliClient();

async function run() {
  const docs = await client.fetch(`*[_type == "post" && !defined(locale)]{_id}`);
  console.log("Docs zonder locale:", docs.length);

  for (const d of docs) {
    await client
      .patch(d._id)
      .set({ locale: "nl" })
      .commit({ autoGenerateArrayKeys: true });
    console.log("✅ fixed", d._id);
  }

  console.log("Klaar.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});