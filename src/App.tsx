import { BrowserRouter, Route, Switch } from 'react-router-dom'; //switch faz com que apenas um componente seja renderizado por pagina

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';


function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
