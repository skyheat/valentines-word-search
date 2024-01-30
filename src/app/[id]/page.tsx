"use client";

import WordTable from "../components/word-table";
import { useEffect, useState } from "react";

export default function Game({ params: { id } }: { params: { id: string } }) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const decodeParams = (id: string) => {
      const decoded = decodeURIComponent(atob(id));
      const splitDecoded = decoded.split("_");

      setWords(splitDecoded);
    };

    decodeParams(id);
  }, [id]);

  return (
    <main className="h-screen flex items-center justify-center flex-col">
      <WordTable words={words} />
    </main>
  );
}
