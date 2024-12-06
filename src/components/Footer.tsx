import { Link } from "react-router-dom";
import githubImage from "@/assets/github.svg";
import curveImage from "@/assets/curve.png";
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
          className="underline flex flex-row items-center"
          target="_blank"
        >
          <img src={githubImage} alt="GitHub" className="w-4 h-4 mr-2" />
          Repository
        </Link>
        <span className="mx-2">|</span>
        <Link
          to="https://curve.fi"
          className="underline flex flex-row items-center"
          target="_blank"
        >
          <img src={curveImage} alt="Curve" className="w-4 h-4 mr-2" />
          Visit Curve
        </Link>
      </div>
      <p className="text-sm italic">
        If you wish to support the work, you can donate to clonescody.eth
      </p>
    </footer>
  );
};
