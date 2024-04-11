"use client"
import Board from "@/components/board";
import Header from "@/components/header";

export default function Home() {
  return (
    <main className="max-w-screen-xl m-0 m-auto">
      <Header className="w-full mt-5"/>
      <Board />
    </main>
  );
}
