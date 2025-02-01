import "./App.css";
import "./components/ProfileCard.css";

import { Greeting } from "./components/Greeting";
import AddCatForm from "./components/AddCatForm";
import BigCats from "./components/BigCats";
import BigCatsImmutable from "./components/BigCatsImmutable";
import Calculator from "./components/Calculator";
import Emoji from "./components/Emoji";


function App() {
  const testMsg = "MayDay !";

  return (
    <>
      <div className="card"></div>
      <div>
        <Greeting name={"Jon Doe"} />
        <Greeting>{testMsg}</Greeting>
        <hr />
        <BigCats />
        <hr />
        <Emoji />
        <hr />
        <BigCatsImmutable />
        <hr />
        <AddCatForm />
        <hr />
        <Calculator />
        <hr />
      </div>
    </>
  );
}

export default App;
