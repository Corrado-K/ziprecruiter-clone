import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
     return (
          <BrowserRouter>
               <AuthContextProvider>
				{/* redux provider store goes here */}
                    <Router />
               </AuthContextProvider>
          </BrowserRouter>
     );
}

export default App;
