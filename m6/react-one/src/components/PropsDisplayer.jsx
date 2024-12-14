// Create a new file called PropsDisplayer.jsx in a components folder
function PropsDisplayer(props) {
  // convert object to string
    const stringProps = JSON.stringify(props);
    return (
    <div className="PropsDisplayer componentBox">
        <h2>Check out my props!</h2>
        <h3>{stringProps}</h3>

    </div>
    );
}

// export this component so we can import it elsewhere
export default PropsDisplayer;
