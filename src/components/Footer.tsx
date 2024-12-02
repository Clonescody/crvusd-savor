import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex flex-col justify-center bg-blue-600 dark:bg-blue-800 text-white p-2 text-center">
      <p>
        Made with ❤️️ by{" "}
        <Link
          to="https://x.com/Clonescody"
          className="underline"
          target="_blank"
        >
          Clonescody
        </Link>{" "}
        🦙
      </p>
      <div className="flex flex-row justify-center">
        <Link
          to="https://github.com/Clonescody/crvusd-savor"
          className="underline"
          target="_blank"
        >
          Repository
        </Link>
        <span className="mx-2">|</span>
        <Link to="https://curve.fi" className="underline" target="_blank">
          Visit Curve
        </Link>
      </div>
    </footer>
  );
};
