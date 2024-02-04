"use client";

import { useState } from "react";
import copy from "copy-to-clipboard";

interface CodeProps {
  code: string;
}

const Code = ({ code }: CodeProps) => {
  const [copied, setCopied] = useState(false);
  const [showCopyKey, setShowCopyKey] = useState(false);

  const copyCode = (code: string) => {
    copy(code);
    setCopied(true);
  };

  return (
    <div
      onMouseOver={() => setShowCopyKey(true)}
      onMouseLeave={() => setShowCopyKey(false)}
      className="flex w-3/4 md:w-1/4 items-center justify-between overflow-hidden rounded-md bg-white border-2 border-red-500 my-2 shadow-md relative"
    >
      <div className="overflow-hidden overflow-x-auto rounded-md m-1">
        <p
          onClick={() => copyCode(code)}
          className="p-2 select-all whitespace-nowrap"
        >
          {code}
        </p>
      </div>
      {showCopyKey && (
        <button
          type="button"
          className="bg-black text-white absolute right-2 top-1 rounded mt-2 px-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={() => {
            copyCode(code);
          }}
        >
          {copied ? "copied" : "copy"}
        </button>
      )}
    </div>
  );
};

export default Code;
