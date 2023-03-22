import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { AuthContextProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
     return (
          <BrowserRouter>
               <AuthContextProvider>
				{/* redux provider store goes here */}
                    <Provider store={store}>
                         <Router />
                    </Provider>
               </AuthContextProvider>
          </BrowserRouter>
     );
}

export default App;
