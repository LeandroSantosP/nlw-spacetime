import NewMemoryForm from "@/components/NewMemoryForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";

export default function NewMemory() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <Link
        href="/"
        className="flex items-center text-sm text-gray-200 hover:text-gray-100"
      >
        {/*// @ts-ignore */}
        <ChevronLeft className="h-5 w-5" />
        Voltar a timeline
      </Link>

      <NewMemoryForm />
    </div>
  );
}
