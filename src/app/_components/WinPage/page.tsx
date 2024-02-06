import Link from "next/link";
import LoveHearts from "../LoveHearts/page";
import Footer from "../Footer/page";

interface WinPageProps {
  words: string[];
}

const WinPage = ({ words }: WinPageProps) => {
  const name1 = words[0];
  const name2 = words[1];

  return (
    <div className="relative h-full w-full from-pink-400 overflow-hidden bg-gradient-to-t">
      <LoveHearts />
      <div className="z-10 relative flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-8xl text-red-600 capitalize font-semibold font-loversquarrel">
          {name1} ❤️ {name2}
        </h1>
        <p className="text-6xl text-red-500 mt-4 font-semibold font-lovelight">
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
        <Footer />
      </div>
    </div>
  );
};

export default WinPage;
