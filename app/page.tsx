import { Abob } from "@/app/abob";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex">
      <Link href="/create">Создать опрос</Link>
      <iframe
        src="https://widgets.freekassa.net?type=payment-window&lang=ru&theme=dark&default_amount=999&api_key=abb1e6c9d59e12fb8e6cb1db061111e0&shopID=60835"
        width="300"
        height="590"
        frameBorder="0"
      ></iframe>
      <Abob />
      <a href="https://freekassa.net" target="_blank" rel="noopener noreferrer">
        <Image
          alt="payment"
          src="https://cdn.freekassa.net/banners/big-dark-1.png"
          title="Прием платежей на сайте"
        />
      </a>
    </div>
  );
}
