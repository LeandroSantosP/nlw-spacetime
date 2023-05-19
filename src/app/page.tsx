import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import dayJs from "dayjs";
import ptBr from "dayjs/locale/pt-br";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

dayJs.locale(ptBr);

interface Memory {
  id: string;
  coverUrl: string;
  excerpt: string;
  createdAt: string;
}

export default async function Home() {
  const isAuthenticated = cookies().has("token");

  if (!isAuthenticated) {
    return <EmptyMemories />;
  }

  const jwt = cookies().get("token")?.value;

  const response = await api.get("/memories", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  const memories = response.data as Memory[];
  if (memories.length === 0) {
    return <EmptyMemories />;
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => {
        const isVideo = /\.(mp4|mov|avi|wmv)$/i.test(memory.coverUrl);

        return (
          <div key={memory.id} className="space-y-4">
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayJs(memory.createdAt).format("D[ de ]MMMM[, ]YYYY")}
            </time>
            {!isVideo ? (
              <Image
                src={memory.coverUrl}
                width={592}
                height={280}
                alt=""
                className="aspect-video w-full rounded-lg object-cover"
              />
            ) : (
              <video src={memory.coverUrl} controls autoPlay muted />
            )}
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>
            <Link
              className="flex items-center gap-2 text-sm text-gray-200"
              href={`/memories/${memory.id}`}
            >
              {/* @ts-ignore */}
              Ler mais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
