import "./css/App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Menu from "./component/Menu";
import AgentInput from "./component/AgentInput";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <AgentInput />
      <Footer />
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default App;
