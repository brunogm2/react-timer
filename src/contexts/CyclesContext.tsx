import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string;
    minutesAmount: number;
}
 
interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle => cycle.id == activeCycleId))

    function setSecondPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished() {
        setCycles(state => state.map(cycle => {
            if (cycle.id == activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
            } else {
                return cycle
            }
        }))
    }

    function CreateNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime());
    
        const newCycle: Cycle = {
          id,
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date(),
        }
    
        setCycles((state) => [...state, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
    
        // reset();
    }
    
    function InterruptCurrentCycle() {
        setCycles(state => state.map(cycle => {
            if (cycle.id == activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
            } else {
            return cycle
            }
        }))

        setActiveCycleId(null);
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