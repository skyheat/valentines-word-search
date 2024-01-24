"use client";

import Image from "next/image";
import WordTable from "../components/word-table";
import { useEffect, useState } from "react";

export default function Game({ params: { id } }: { params: { id: string } }) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  useEffect(() => {
    const decodeParams = (id: string) => {
      const decodedNames = decodeURIComponent(atob(id));
      const names = decodedNames.split("_");

      setName1(names[0]);
      setName2(names[1]);
    };

    decodeParams(id);
  }, [id]);

  return (
    <main className="h-screen flex items-center justify-center flex-col">
      <WordTable name1={name1.toLowerCase()} name2={name2.toLowerCase()} />
    </main>
  );
}
