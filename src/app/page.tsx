"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Home({}) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [displayLink, setDisplayLink] = useState(false);
  const [link, setLink] = useState("");

  const domainLink = process.env.NEXT_PUBLIC_DOMAIN;

  const handleLinkGeneration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name1 && name2) {
      const encodedNames = btoa(
        encodeURIComponent(name1 + "_" + name2)
      ).replace(/=+$/, "");
      setLink("/" + encodedNames);

      setDisplayLink(true);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-100 p-6">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8">
        Valentine&apos;s Wordsearch
      </h1>
      <form
        onSubmit={handleLinkGeneration}
        className="flex flex-col items-center gap-4"
      >
        <input
          type="text"
          id="name1"
          placeholder="Enter your first name"
          className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none transition-colors"
          value={name1}
          maxLength={12}
          onChange={(e) => setName1(e.target.value)}
        />
        <input
          type="text"
          id="name2"
          placeholder="Enter your Valentine's first name"
          className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none transition-colors"
          value={name2}
          maxLength={12}
          onChange={(e) => setName2(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-200 ease-in-out"
        >
          Generate Link
        </button>
      </form>
      {displayLink && (
        <Link href={link}>
          <p className="mt-6 px-4 py-2 bg-white rounded shadow text-red-500 hover:text-red-600 transition duration-200 ease-in-out">
            {domainLink + link}
          </p>
        </Link>
      )}
    </main>
  );
}
