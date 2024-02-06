interface LoveHeartsProps {
  numHearts?: number;
}

const LoveHearts = ({ numHearts = 15 }: LoveHeartsProps) => {
  const hearts = Array.from({ length: numHearts });

  return (
    <>
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
    </>
  );
};

export default LoveHearts;
