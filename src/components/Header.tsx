import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAddressStore } from "@/store/useAddressStore";
import { useThemeStore } from "@/store/useThemeStore";

export const Header = () => {
  const { userAddress, clearUserAddress } = useAddressStore((state) => state);
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(theme === "dark");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (darkMode) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode, setTheme]);

  const handleAddressClick = () => {
    clearUserAddress();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold">The Saving Llama</h1>
        <nav className="flex space-x-4">
          <NavLink
            to={`${userAddress}/savings`}
            className={`text-white hover:text-blue-200 ${
              location.pathname.includes("/savings") ? "underline" : ""
            }`}
          >
            Savings
          </NavLink>
          <NavLink
            to={`${userAddress}/lending`}
            className={`text-white hover:text-blue-200 ${
              location.pathname.includes("/lending") ? "underline" : ""
            }`}
          >
            Lending
          </NavLink>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {userAddress && (
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {isHovering ? (
              <button onClick={handleAddressClick} className="underline">
                Disconnect
              </button>
            ) : (
              <button className="underline">
                {`${userAddress.slice(0, 4)}...${userAddress.slice(-4)}`}
              </button>
            )}
          </div>
        )}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};
