
import './App.css';
import Post from './Post';

import {Routes,Route} from "react-router-dom"
import Layout from './Layout';
import Indexpage from './pages/MIndexpage';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import {Usercontextprovider} from './Usercontext';
import Createpost from './pages/Createpost';
import Postpage from './pages/Postpage';
import Editpost from './pages/Editpost';
function App() {
  return (
    <Usercontextprovider>
     <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Indexpage/> } />
      <Route path="/login" element={<Loginpage/>} />
      <Route path="/register" element={<Registerpage/>}/>
      <Route path="/create" element={<Createpost/>} />
      <Route path="/post/:id" element={<Postpage/>}/>
      <Route path="/edit/:id" element={<Editpost/>}/>
      </Route>
     
    </Routes>
    </Usercontextprovider>
    
    
  );
}

export default App;
