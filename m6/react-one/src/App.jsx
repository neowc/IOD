import { useEffect, useState } from 'react'
import "./App.css";
import "./components/ProfileCard.css";
import PropTypes from 'prop-types';
import reactLogo from './assets/react.svg'

//import Component2, { Component1, DisplayText } from './components/counters'
import ExampleComponent from "./components/Example";
import Welcome from "./components/Welcome";
import PropsDisplayer from './components/PropsDisplayer';
import City from "./components/City";
import { Greeting } from "./components/Greeting";
import ProfileCard from "./components/ProfileCard";
import { ComplexComment } from "./components/ComplexComment";
import MoviesList from "./components/MoviesList";
import Pet from "./components/Pet";
import FullName from "./components/FullName";
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
import Unmount from './components/Unmount';
import VideoPlayer from './components/VideoRef';

function App() {
  const testMsg = "MayDay !";
  const count = 0;
  const [timer, setTimer] = useState(0);
  const [counter, setCounter] = useState(0);

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

  useEffect(() => {
    console.log("On-Mount: The count is: ", counter);
  }, [counter]);

  return (
    <>
      <div className="card">{introMessage}</div>

      <div>
        {/* Renders the Welcome component with a name prop and a child (nested) element */}
        <Welcome name="Wei Chang">
            <p>Children of Welcome</p>
        </Welcome>

        {/* Renders the component with no props */}
        <PropsDisplayer />
        {/* Renders the component with a single prop 'myProp' */}
        <PropsDisplayer myProp="first prop"/>

        {/* Renders the component with multiple props - add your own! */}
        <PropsDisplayer prop1="first" prop2="second" prop3={3}/>

        {/* String prop value uses quotes, numeric prop value uses curly braces */}
        <PropsDisplayer name="Harry Styles" age={29}/>

        {/* Array prop value - uses curly braces */}
        <PropsDisplayer pets={["cat", "dog", "goldfish"]}/>

        {/* Variable prop values - uses curly braces */}
        <PropsDisplayer reactLogo={reactLogo} buttonCount={count}/>

        {/* Our PropsDisplayer component won’t handle stringifying other components */}
        {/* <PropsDisplayer component={<ExampleComponent />}/> - fails for this example but the concept is still valid */}
        {/* <PropsDisplayer component={<ExampleComponent />}/> */}

        {/* state and country are not specified, will use defaults */}
        <City name="Sydney" />
        {/* country is not specified, will use default */}
        <City name="Melbourne" state="VIC" />
        {/* all values are specified, won't use defaults */}
        <City name="Chicago" state="Illinois" country="USA" />
        {/* Everything in between <City> and </City> is passed as props.children */}
        <City name="Newcastle">
          <div>Newcastle is a harbour city in the Australian state of New South Wales.</div>
          <div><strong>Population:</strong> 322,278 (2016)</div>
        </City>

        <Pet name="Mao Mao" colour="brown"/>
        <ExampleComponent timer={timer}  />
        <button onClick={ () => setTimer(timer + 1)}>Increment Timer</button>

        <Greeting name={"Jon Doe"} />
        <Greeting name={testMsg} />
        <hr />
        <ProfileCard name="John Doe" age={30} bio="I am a web developer" />
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
        {counter}
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        {counter > 5 ? null : <Unmount />}
        <hr />
        <BitcoinRates />
        <hr />
        <VideoPlayer />
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
