import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="dark flex min-h-screen flex-col items-center justify-center text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Sprite <span className="text-[hsl(176,64%,55%)]">Sheet</span> ME
          </h1>
          <div className="flex flex-col items-center gap-2 rounded-xl bg-zinc-800 p-12">
            <p className="text-2xl text-white">Get Started Now!</p>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
