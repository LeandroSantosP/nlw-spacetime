import { getUserCredentials } from "@/lib/auth";
import Image from "next/image";

export const Profile = () => {
  const { avatar_url, name } = getUserCredentials();
  return (
    <div className="flex items-center gap-3 text-left">
      <Image
        src={avatar_url}
        width={40}
        height={40}
        alt="Imagem de perfil"
        className="h-10 w-10 rounded-full"
      />
      <p className="max-w-[140px] text-sm leading-snug">
        {name}
        <a
          href="/api/auth/logout"
          className="block text-red-400 hover:text-red-300"
        >
          Quero sair
        </a>
      </p>
    </div>
  );
};
