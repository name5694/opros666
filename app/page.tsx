import { Abob } from "@/app/abob";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <Link href="/create">Создать опрос</Link>

      <Abob />
    </div>
  );
}
