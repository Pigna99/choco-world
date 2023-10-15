import { shiftMenu } from "@/utils/frontend/menu";
import { creatureMenuList, newMenuList } from "@/utils/frontend/utilsFrontend";
import {MouseEventHandler, PropsWithChildren, createContext, useContext, useState } from "react";

type MenuContextProps = {
    cycleMenu:(left:boolean)=>(()=>void),
    resetToStartMenu:()=>void,
    resetToNewMenu:()=>void,
    selectedMenu:{name:string, list:number[]}
}

const MenuContext = createContext<MenuContextProps | null>(null);

const startMenu = { name: 'creature', list: [creatureMenuList.length - 1, 0, 1] };//if there is a creature
const startMenuNew = { name: 'new', list: [newMenuList.length - 1, 0, 1] }//for creating a new creature

export const MenuProvider = (props: PropsWithChildren) => {
    //menu
    const [selectedMenu, setSelectedMenu] = useState(startMenu) //actual selected menu

    const cycleMenu = (left: boolean) => (): void => {//cycle left/right throw menu elements
        const length_menu = (selectedMenu.name === 'new' ? newMenuList.length : creatureMenuList.length);
        let newMenu = shiftMenu(selectedMenu.list, left);
        left ?
            newMenu[0] < 0 ? (newMenu = [length_menu - 1, newMenu[1], newMenu[2]]) : null
            :
            newMenu[2] > length_menu - 1 ? newMenu = [newMenu[0], newMenu[1], 0] : null;
        setSelectedMenu({ ...selectedMenu, list: newMenu })
    }

    const resetToStartMenu = ()=>{
        setSelectedMenu(startMenu);
    }

    const resetToNewMenu = ()=>{
        setSelectedMenu(startMenuNew);
    }

    return (
        <MenuContext.Provider value={{cycleMenu,resetToStartMenu,resetToNewMenu,selectedMenu}}>
            {props.children}
        </MenuContext.Provider>
    )
}

const useMenuContext = (): MenuContextProps => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error("Please use MenuProvider in parent component");
    }
    return context;
};

export { useMenuContext };