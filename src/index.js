import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/userStore";
import StrategyStore from "./store/strategyStore";
import BriefcaseStore from "./store/briefcaseStore";


const userStore = new UserStore()
const strategyStore = new StrategyStore()
const briefcaseStore = new BriefcaseStore()
export const Context = createContext({
    briefcaseStore, userStore,strategyStore
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{userStore, strategyStore,briefcaseStore}}>
    <App />

  </Context.Provider>
);

reportWebVitals();
