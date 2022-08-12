import logo from "./logo.svg";
import "./App.css";
import Pages from "./pages/Pages";
import Data from "./hooks/Data";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };
  return (
    <div className="App">
      <ScrollToTop />
      <Data />
      <Pages />
    </div>
  );
}

export default App;
