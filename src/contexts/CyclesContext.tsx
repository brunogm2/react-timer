import { createContext, ReactNode, useReducer, useState } from "react";
import { ActionTypes, addNewCycleAction, interruptedCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { Cycle, cyclesReducers } from "../reducers/cycles/reducer";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}

interface CyclesContextType {
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondPassed: (seconds: number) => void;
    CreateNewCycle: (data: CreateCycleData) => void;
    InterruptCurrentCycle: () => void;
}

interface CyclesContextProviderProps {
    children: ReactNode;
}

export const CyclesContext = createContext({} as CyclesContextType);

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducers, {
        cycles:[],
        activeCycleId: null
    });

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;

    const activeCycle = cycles.find((cycle => cycle.id == activeCycleId))

    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        dispatch(markCurrentCycleAsFinishedAction())
    }

    function CreateNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
    
        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle));
    
        setAmountSecondsPassed(0);
    
        // reset();
    }
    
    function InterruptCurrentCycle() {
        dispatch(interruptedCycleAction())
    }

    return(
        <CyclesContext.Provider 
            value={{ 
                cycles,
                activeCycle, 
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed,
                setSecondPassed,
                CreateNewCycle,
                InterruptCurrentCycle
            }}
        >
            {children}
        </CyclesContext.Provider>
    )
}