import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import UploadForm from "./_components/FileUpload";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="dark flex h-full max-h-[calc(100%-4rem)] w-[calc(100%-8px)] flex-col items-center justify-start text-white">
        <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            sprite<span className="text-sky-400">sheet</span> me
          </h1>
          <p>Upload a character sprite and generate a spritesheet</p>
          <UploadForm />
        </div>
      </main>
    </HydrateClient>
  );
}
