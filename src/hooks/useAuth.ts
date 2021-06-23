import { useContext } from 'react'; //recupera o valor de um contexto
import { AuthContext } from '../contexts/AuthContext';

/*Nas páginas estavamos usando a seguinte linha:
    
    const {user, signInWithGoogle} = useContext(AuthContext);

  E para isso estamos importando tanto o useContext como o AuthContext
  Nesse arquivo estamos juntando isso.

  Agora, podemos usar da seguinte forma:

    const {user, signInWithGoogle} = useAuth();
*/

export function useAuth() {
    const value = useContext(AuthContext);

    return value;
}