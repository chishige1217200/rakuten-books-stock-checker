import "@progress/kendo-theme-default/dist/all.css";
import Main from "@/components/main";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-8">
        <Main />
        <div>
          手動で商品を登録する場合は
          <Link href="/manual" className="text-blue-400">
            こちら
          </Link>
        </div>
      </div>
    </>
  );
}
