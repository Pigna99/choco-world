import {MouseEventHandler, PropsWithChildren, createContext, useContext, useState } from "react";

type AppContextProps = {
}

const AppContext = createContext<AppContextProps | null>(null);
//this context define all the functions/interactions with the user

export const AppProvider = (props: PropsWithChildren) => {
    
    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

const useAppContext = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("Please use AppProvider in parent component");
    }
    return context;
};

export { useAppContext };