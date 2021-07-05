import { useEffect } from 'react';
import { useState } from 'react';
import { createContext, ReactNode } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
    children: ReactNode;
}

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType); //inicia como light

export function ThemeContextProvider(props: ThemeContextProviderProps) {

    const [currentTheme, setCurrentTheme] = useState<Theme>(() => { //podemos setar o estado com um callback em que o retorno será o estado
        const storagedTheme = localStorage.getItem('theme');
        
        return (storagedTheme ?? 'light') as Theme; //retorna storagedTheme caso exista, se não retorna light - o 'as Theme' define a tipagem
    });

    useEffect(() => {
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme])

    function toggleTheme() {
        setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

/**
 * O props.children diz respeito a todos os componentes que estarão entre o <ThemeContext.Provider>
 * Exemplo:
 * 
 *  <ThemeContext.Provider value={'light'}>
 *      <Home />
 *      <Button />
 *  </ThemeContext.Provider>
 * 
 */