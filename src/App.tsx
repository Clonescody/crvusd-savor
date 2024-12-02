import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAddressStore } from "@/store/useAddressStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RootPage } from "@/pages/RootPage";
import { LendingPage } from "@/pages/LendingPage";
import { LendingVaultPage } from "@/pages/LendingVaultPage";
import { SavingsPage } from "@/pages/SavingsPage";

const App = () => {
  const { userAddress } = useAddressStore((state) => state);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (userAddress !== "") {
      setShowHeader(true);
    }
  }, [userAddress]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {showHeader && <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<RootPage />} />
            <Route path="/:userAddress/savings" element={<SavingsPage />} />
            <Route path="/:userAddress/lending" element={<LendingPage />} />
            <Route
              path="/:userAddress/lending/:vaultAddress"
              element={<LendingVaultPage />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
