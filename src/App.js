import './App.css';
import Sidebar from './containers/sidebar/Sidebar';
import {GlobalProvider} from './context/GlobalState';


function App() {
    return (
        <GlobalProvider>
           <Sidebar/>
        </GlobalProvider>
    );
}

export default App;
