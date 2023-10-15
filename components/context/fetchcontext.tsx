import { MouseEventHandler, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { API_string, creatureMenuList, newMenuList, precalcFeed, precalcPet } from "@/utils/frontend/utilsFrontend";
import { Creature, Gender, savedChoco } from "@/utils/interfaces";
import { VisualCreatureClass } from "@/utils/frontend/VisualCreatureClass";
import { checkCreatureId, validateNewCreature, isUpdateTime } from "@/utils/frontend/fetchValidation";
import { useGlobalContext } from "./globalcontext";
import { useAudioContext } from "./audiocontext";
import { DEBUG } from "@/utils/settings";
import { useScreenContext } from "./screencontext";
import { useMenuContext } from "./menucontext";

type FetchPropsProvided = {
    isFetching: boolean, creatureInfo: Creature,
    feedFetch: ()=>Promise<void>, petFetch: ()=>Promise<void>,//actions
    loadCreatureFetch: (id: string) => Promise<boolean>, newCreatureFetch: (name: string, color: string, gender: Gender) => Promise<boolean>, //load, new
}

const FetchContext = createContext<FetchPropsProvided | null>(null);


let startUpdateTimeout: NodeJS.Timeout | null = null;

export const FetchProvider = (props: PropsWithChildren) => {
    const { startImportantAnimation, stopImportantAnimation, updateVisuals, isPlayingAnimation, removeClicks } = useScreenContext()
    const { isFirstRendering, localInfo, updateLocalInfo, addCreatureToList, removeActualCreature, startFetch, setLoadingInfo } = useGlobalContext()
    const { setMusicTrace, setAudioTrace } = useAudioContext()
    const {resetToStartMenu, resetToNewMenu} = useMenuContext();

    //loading tools
    const [isFetching, setIsFetching] = useState(false); //fetching 

    //TIMEOUT LOGIC - used only for the fetches
    const [updateTimeout, setUpdateTimeout] = useState(startUpdateTimeout);
    const stopTimeout = () => {
        //console.log(updateTimeout+ ' stopped')
        if (updateTimeout) clearTimeout(updateTimeout);
    }
    const newTimeout = (f: Function, time: number) => {
        stopTimeout();
        setUpdateTimeout(setTimeout(() => { f() }, time))
    }
    //TIMEOUT LOGIC 

    //check if is time to update the creature from API
    const [lastUpdate, setLastUpdate] = useState(new Date(0));
    const [isUpdatedlastUpdate, setIsUpdatedlastUpdate] = useState(false);//wait for the end for saving (useEffect)

    const [creatureInfo, setCreatureInfo] = useState(VisualCreatureClass.generatePlaceholder());//change to a special info class/interface
    const [isUpdatedCreatureInfo, setIsUpdatedCreatureInfo] = useState(false);//wait for the end of saving (useEffect)

    //fetching commands
    const loadCreatureFetch = async (id: string) => {
        const response = await apiFetch(`/api/check?id=${id}`, true);
        if (!response[0]) return false;
        const c: savedChoco = response[1].savedCreature;
        addCreatureToList(c);
        return true;
    }
    const newCreatureFetch = async (name: string, color: string, gender: Gender) => {
        stopTimeout()
        const response = await apiFetch(`/api/new?name=${name}&color=${color.split('#')[1]}&gender=${gender}`, false, true);
        if (!response[0]) return false;
        const c: savedChoco = response[1].savedCreature;
        setCreatureInfo({ ...creatureInfo, color: c.color });
        setTimeout(() => { addCreatureToList(c) }, 8000)//not always working (or working double!)
        return true;
    }
    const feedFetch = async () => {
        stopTimeout()
        await apiCore('feed', false);
    }
    const petFetch = async () => {
        stopTimeout()
        await apiCore('pet', false);
    }
    const updateCommand = async (force?: boolean, then?: () => void) => {
        if (localInfo.last_choco === '' || localInfo.last_choco === 'new') return;
        if (!isUpdateTime(lastUpdate) && !force) {//update only visual, not API
            updateVisuals(creatureInfo.state)
            newTimeout(updateCommand, 5000);
            return;
        };
        await apiCore('update', true);
        if (then) then()
    }
    const apiCore = async (api: API_string, forceVisual?: boolean) => {
        const response = await apiFetch(`/api/${api}?id=${localInfo.last_choco}`, true);
        if (!response[0]) return;
        const creature: Creature = response[1].creature;
        setCreatureInfo(creature)
        if (forceVisual) updateVisuals(creature.state)//update the visual state after fetching
    }
    const apiFetch = async (apiString: string, loading: boolean, resetClicks?: boolean) => {
        if (DEBUG) console.log("Update API - " + apiString)
        if (loading) setIsFetching(true);
        const res = await fetch(apiString, { method: 'POST' })
        const data = await res.json()
        if (loading) setIsFetching(false);
        if (!data) {
            console.log("ERROR! FETCH DATA NOT RECEIVED");
            //for loading screen
            if (resetClicks) removeClicks()
            return [false, null];
        }
        if (!data.creature && !data.savedCreature) {
            console.log("ERROR! API DATA NOT RECEIVED");
            //for loading screen
            if (resetClicks) removeClicks()
            if (data.error === 'noiddb') {
                removeActualCreature();
            }
            return [false, null];
        }
        //first fetching for loading screen
        setLastUpdate(new Date());
        return [true, data]
    }


    useEffect(() => {//first update+menu change
        if(!startFetch)return;
        console.log(localInfo)
        if (localInfo.last_choco !== '' && localInfo.last_choco !== 'new') {//first update and set a creature throgh id
            updateVisuals('loading');
            stopTimeout();
            setLoadingInfo({name:'loading choco', percentage:0})
            updateCommand(true, () => {
                resetToStartMenu();
                updateLocalInfo();
                setLoadingInfo({name:'loading complete', percentage:100})
            });
            return;
        }
        if (localInfo.last_choco === 'new') {//new creature setting screen
            resetToNewMenu();
            stopTimeout();
            updateVisuals('egg')
            setMusicTrace('fight')
            setLoadingInfo({name:'loading complete', percentage:100})
            return;
        }

    }, [localInfo.last_choco, startFetch])

    useEffect(() => {//if creature is saved
        if (!isFirstRendering) setIsUpdatedCreatureInfo(true);
    }, [creatureInfo])

    useEffect(() => {//if last update is saved
        if (!isFirstRendering) setIsUpdatedlastUpdate(true);
    }, [lastUpdate])

    useEffect(() => {//after the fetch, when all the info are saved
        if (isUpdatedCreatureInfo && isUpdatedlastUpdate) {
            newTimeout(async () => { await updateCommand(); stopImportantAnimation(); }, 5000);
            setIsUpdatedCreatureInfo(false); setIsUpdatedlastUpdate(false);
            //set music based on the new state
            if (creatureInfo.state === 'walking') setMusicTrace('theme')
            if (creatureInfo.state === 'sleeping') setMusicTrace('sleep')
        }
    }, [isUpdatedCreatureInfo, isUpdatedlastUpdate])

    return (
        <FetchContext.Provider value={{ creatureInfo, isFetching, feedFetch, petFetch, loadCreatureFetch, newCreatureFetch }}>
            {props.children}
        </FetchContext.Provider>
    );
};

const useFetchContext = (): FetchPropsProvided => {
    const context = useContext(FetchContext);
    if (!context) {
        throw new Error("Please use FetchProvider in parent component");
    }
    return context;
};

export { useFetchContext };