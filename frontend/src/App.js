import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import MemoryForm from "./components/MemoryForm";
import EditMemoryForm from "./components/EditMemoryForm";
import MemoryDisplay from "./components/MemoryDisplay";
import Splash from "./components/Splash"
import * as sessionActions from "./store/session";
import Homepage from "./components/Homepage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path='/' exact>
        <Splash />
      </Route>
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
      <Route path='/memoryForm'>
        <MemoryForm />
      </Route>
      <Route path="/homepage">
        <Homepage />
      </Route>
      <Route path="/memories/:memoryId" exact>
        <MemoryDisplay />
      </Route>
      <Route path="/memories/:memoryId/edit" exact>
        <EditMemoryForm />
      </Route>
    </Switch>
  );
}

export default App;