import logo from "./logo.svg";
import "./App.css";
import UserApp from "./components/UserApp.jsx";
import StockApp from "./components/StockApp.jsx";
function App() {
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        padding: "10px",
      }}
    >
      <UserApp></UserApp>
      <StockApp></StockApp>
    </div>
  );
}

export default App;
