"use client";

import React, { useState } from "react";
import Link from "next/link";
import Code from "./_components/Code/page";
import Footer from "./_components/Footer/page";
import LoveHearts from "./_components/LoveHearts/page";

export default function Home({}) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [displayLink, setDisplayLink] = useState(false);
  const [link, setLink] = useState("");

  const nameMaxLength = 10;

  const domainLink = process.env.NEXT_PUBLIC_DOMAIN;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, "");

    if (e.target.id === "name1") {
      setName1(value);
    } else if (e.target.id === "name2") {
      setName2(value);
    }
  };

  const handleLinkGeneration = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name1 && name2) {
      const encodedNames = btoa(
        encodeURIComponent(
          name1.toLowerCase() + "_" + name2.toLowerCase() + "_love_valentine"
        )
      ).replace(/=+$/, "");
      setLink("/" + encodedNames);

      setDisplayLink(true);
    }
  };
  return (
    <main className="relative h-full w-full from-pink-400 overflow-hidden bg-gradient-to-t">
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
        <LoveHearts />
        <h1 className="text-6xl md:text-8xl text-red-500 mb-8 font-semibold font-lovelight">
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
              className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none pr-10 transition-colors shadow-lg"
              value={name1}
              maxLength={nameMaxLength}
              minLength={2}
              required
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-600 absolute inset-y-3 right-0 pr-2">
              {name1.length}/{nameMaxLength}
            </p>
          </div>
          <div className="relative">
            <input
              type="text"
              id="name2"
              placeholder="Valentine's first name"
              className="text-lg p-2 rounded border-2 border-red-300 focus:border-red-500 focus:outline-none pr-10 transition-colors shadow-lg"
              value={name2}
              maxLength={nameMaxLength}
              minLength={2}
              required
              onChange={handleInputChange}
            />
            <p className="text-sm text-gray-600 absolute inset-y-3 right-0 pr-2">
              {name2.length}/{nameMaxLength}
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200 ease-in-out shadow-lg"
          >
            Generate Link
          </button>
        </form>
        {displayLink && (
          <Code code={(domainLink + link).toString()} link={link} />
        )}
        <Footer />
      </div>
    </main>
  );
}
