import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col pb-4">
      <div className="flex justify-center mt-10">
        <Link
          className="hover:underline"
          href="https://github.com/skyheat/valentines-word-search"
        >
          GitHub
        </Link>
        <span className="mx-2">·</span>
        <Link href="https://www.leilomo.net/" className="hover:underline">
          Main Site
        </Link>
      </div>
      <div className="text-gray-600 mt-3 px-6 text-center">
        <p>
          Made with ❤️ by{" "}
          <Link
            className="hover:underline"
            href="https://instagram.com/diorleilomo"
          >
            @diorleilomo
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
