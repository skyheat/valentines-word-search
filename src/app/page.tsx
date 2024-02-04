"use client";

import { useState } from "react";
import Link from "next/link";
import Code from "./_components/Code/page";

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
        encodeURIComponent(name1 + "_" + name2 + "_be_my_valentine")
      ).replace(/=+$/, "");
      setLink("/" + encodedNames);

      setDisplayLink(true);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-pink-100 p-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-8">
        Valentine&apos;s Word Search
      </h1>
      <form
        onSubmit={handleLinkGeneration}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <input
            type="text"
            id="name1"
            placeholder="Your first name"
            className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none pr-10 transition-colors"
            value={name1}
            maxLength={12}
            onChange={(e) => setName1(e.target.value)}
          />
          <p className="text-sm text-gray-600 absolute inset-y-3 right-0 pr-2">
            {name1.length}/12
          </p>
        </div>
        <div className="relative">
          <input
            type="text"
            id="name2"
            placeholder="Valentine's first name"
            className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none pr-10 transition-colors"
            value={name2}
            maxLength={12}
            onChange={(e) => setName2(e.target.value)}
          />
          <p className="text-sm text-gray-600 absolute inset-y-3 right-0 pr-2">
            {name2.length}/12
          </p>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out"
        >
          Generate Link
        </button>
      </form>
      {displayLink && (
        <Code code={(domainLink + link).toString()} link={link} />
      )}
    </main>
  );
}
