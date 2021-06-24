import { useContext } from 'react'; //recupera o valor de um contexto
import { ThemeContext } from '../contexts/ThemeContext';

export function useTheme() {
    const value = useContext(ThemeContext);

    return value;
}