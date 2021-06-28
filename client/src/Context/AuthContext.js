import React, {createContext, useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

// components we want to wrap our provider around
export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // boolean value to see if app is loaded, once we get server isloaded is set to true
    const [isLoaded, setIsLoaded] = useState(null);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);
    return (
        <div>
            {!isLoaded ? <h1>Loading..</h1> : 
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                    { children }
                </AuthContext.Provider>}
        </div>
    )
}