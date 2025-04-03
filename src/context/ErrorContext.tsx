import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface ContextState {
    setError: (errorMessage: string) => void;
    errorMessage: string;
}

const SnackbarContext = createContext<ContextState>({} as ContextState);

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
    const [message, setMessage] = useState<string>('');

    const setError = (msg: string) => setMessage(msg);

    const value = {
        errorMessage: message,
        setError: setError
    };

    return (
        <SnackbarContext.Provider value={value}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbar = () => useContext(SnackbarContext);
