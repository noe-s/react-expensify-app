//Higher Order Component (HOC) - A component (HOC) tht renders another component
//Reuse code
//Redner Hijacking
//Prop Manipulation
//Abstract state
import ReactDOM from 'react-dom';
import React from 'react';

const Info = (props) =>(
    <div>
        <h1>Info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) =>{ //takes in other component as input
    return (props) =>( //returns the HOC
        <div>
            { props.isAdmin && <p>This is private info. Please don't share</p>}
            <WrappedComponent {...props}/> {/* Can spread any object. this takes any key val pairs and passes em in*/}
        </div>
    );
};

const requireAuthentication = (WrappedComponent) =>{
    return (props) =>(
        <div>
            {props.isAuthenticated ? (
            <WrappedComponent {...props} />
            ) : (
                <p>Please login to view info</p>
            )}
        </div>
    );
};

const AdminInfo = withAdminWarning(Info); //Info component as input.
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="These are the details"/>,document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details"/>,document.getElementById('app'));