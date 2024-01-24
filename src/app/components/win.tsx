import Link from "next/link";

interface WinPageProps {
  name1: string;
  name2: string;
}

const WinPage = ({ name1, name2 }: WinPageProps) => {
  // Array to create multiple hearts
  const hearts = Array.from({ length: 15 }); // Adjust the number of hearts as needed

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
            animationFillMode: "forwards", // Keep hearts at their final state
            left: `${10 + ((index * 10) % 90)}%`, // Distribute hearts horizontally
            fontSize: `${Math.random() * (2 - 1) + 1}rem`, // Randomize heart sizes
          }}
        >
          ❤️
        </div>
      ))}

      <div className="z-10 relative flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-bold text-red-600 capitalize">
          {name1} ❤️ {name2}
        </h1>
        <p className="text-xl md:text-2xl text-red-500 mt-4">
          Happy Valentine&apos;s Day!
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
          >
            Create your Own Wordsearch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WinPage;
