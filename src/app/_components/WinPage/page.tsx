import Link from "next/link";

interface WinPageProps {
  words: string[];
}

const WinPage = ({ words }: WinPageProps) => {
  // Array to create multiple hearts
  const hearts = Array.from({ length: 20 });
  const name1 = words[0];
  const name2 = words[1];

  return (
    <div className="relative h-full w-full bg-pink-100 overflow-hidden">
      {hearts.map((_, index) => (
        <div
          key={index}
          className="absolute text-red-500 opacity-0"
          style={{
            animation: `floatUp ${5 + (index % 5)}s linear ${
              index * 0.5
            }s infinite`,
            animationFillMode: "forwards",
            left: `${10 + ((index * 10) % 90)}%`,
            fontSize: `${Math.random() * (2 - 1) + 1}rem`,
          }}
        >
          ❤️
        </div>
      ))}

      <div className="z-10 relative flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 capitalize">
          {name1} ❤️ {name2}
        </h1>
        <p className="text-xl md:text-4xl text-red-500 mt-4">
          Be My Valentine?
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="px-6 py-3 bg-red-500 text-white rounded shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Create Word Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
