import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUser = (newUserData) => {
        setUserData(newUserData);
    };

    return (
        <AppContext.Provider value={{ userData, updateUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
