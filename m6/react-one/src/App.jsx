//import { useState } from 'react'
import "./App.css";
import "./components/ProfileCard.css";
import PropTypes from 'prop-types';

//import Component2, { Component1, DisplayText } from './components/counters'
// import { ExampleComponent } from "./components/example"
// import { ProfileCard } from "./components/ProfileCard"
// import PropsDisplayer from './components/PropsDisplayer'
import { Greeting } from "./components/Greeting";
import { ComplexComment } from "./components/ComplexComment";
import MoviesList from "./components/MoviesList";
import BigCatsImmutable from "./components/BigCatsImmutable";
import MoodChanger from "./components/MoodChanger";
//import Emoji from "./components/Emoji";
//import Emoji from "./components/Aemoji";
import  LoginForm from "./components/LoginForm";
import ErrorBomb from "./components/ErrorBomb";
import BitcoinRates from "./components/BitcoinRates";
import UseRefExample from "./components/UseRefExample";
import ReducerCounter from "./components/ReducerCounter";
import UseReducerExample from "./components/ReducerExample";
import SubscribeForm from "./components/TodoUseFormInput";
import CustomHookExample from "./components/CustomCounter";

function NamePart(props) {
  return (
    // reusable component to display part of a name from the value prop
    <span className="NamePart">{props.value}</span>
  );
}
function FullName(props) {
  return (
    // composes the NamePart component to display a full name
    <div className="FullName componentBox">
      Full name: <NamePart value={props.first} />{" "}
      <NamePart value={props.middle} /> <NamePart value={props.last} />
    </div>
  );
}

function App() {
  const test = "MayDay !";
  //const [timer, setTimer] = useState(0);
  const introMessage = (
    <div>
      <h1>Welcome to my React app!</h1>
      <p>This is a p-tag example of a React component.</p>
      <ul>
        <li>React</li>
        <li>React Router</li>
        <li>React Hooks</li>
      </ul>
    </div>
  );

  return (
    <>
      <div className="card">{introMessage}</div>

      <div>
        <Greeting name={"Jon Doe"} />
        <Greeting name={test} />
        <hr />
        <FullName first="Cheong" middle="Wei" last="Neo" />
        <hr />
        <ComplexComment author={comment.author} date={comment.date} text={comment.text} src={comment.author.avatarUrl}/>
        <hr />
        <Comment {...comment} /> {/* spread operator */}
        <hr />
        <MoviesList />
        <hr />
        <MoodChanger />
        <hr />
        <BigCatsImmutable />
        <hr />
        <LoginForm />
        <hr />
        <ErrorBomb />
        <hr />
        <BitcoinRates />
        <hr />
        <UseRefExample />
        <hr />
        <ReducerCounter />
        <hr />
        <UseReducerExample />
        <hr />
        <SubscribeForm />
        <hr />
        <CustomHookExample />
        <hr />
        {/* <ProfileCard name="John Doe" age={30} bio="I am a web developer" />
        <PropsDisplayer />
        <PropsDisplayer myProp="first prop"/>
        <PropsDisplayer prop1="first" prop2="second" prop3={3}/>
        <ExampleComponent timer={timer}  />
        <button onClick={ () => setTimer(timer + 1)}>Increment</button> */}
      </div>
    </>
  );
}

const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    // author is also an object
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64",
  },
};

function Avatar({ avatarUrl, name }) {
  return <img className="Avatar" src={avatarUrl} alt={name} />;
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      {" "}
      {/* the user info is one aspect of the comment */}
      <Avatar {...props.user} />{" "}
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function FormattedDate({ date }) {
  return <div className="Comment-date">{date.toLocaleString()}</div>;
}

function Comment(props) {
  return (
    <div className="Comment componentBox">
      <UserInfo user={props.author} />{" "}
      {/* here we pass the author prop down to the UserInfo component */}{" "}
      <div className="Comment-text">{props.text}</div>
      <FormattedDate date={props.date} />
    </div>
  );
}

NamePart.propTypes = {
  value: PropTypes.string.isRequired,
};
FullName.propTypes = {
  first: PropTypes.string.isRequired,
  middle: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
};

Avatar.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};
FormattedDate.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};
Comment.propTypes = {
  author: PropTypes.object.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string.isRequired,
};

export default App;
