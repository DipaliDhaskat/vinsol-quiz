import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import Home from './components/Home';
import QuestionFirst from './components/QuestionFirst'
import QuestionSecond from './components/QuestionSecond'
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./store/perStore";
import store from "./store/perStore";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/QuestionFirst" element={<QuestionFirst />} />
              <Route path="/QuestionSecond" element={<QuestionSecond />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>

      </Provider>
    </div>
  );
}

export default App;
