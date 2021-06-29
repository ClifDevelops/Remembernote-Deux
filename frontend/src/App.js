import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import MemoryForm from "./components/MemoryForm";
import Splash from "./components/Splash"
import RichTextEditor from "./components/RichTextEditor";
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
        <Homepage isLoaded={isLoaded}/>
      </Route>
      <Route path='/editor'>
        <RichTextEditor />
      </Route>
    </Switch>
  );
}

export default App;