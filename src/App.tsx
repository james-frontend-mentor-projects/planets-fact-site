import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "./components/Loader";
import { NotFound } from "./components/NotFound";
import { Planet } from "./components/Planet";
import PlanetsContext from "./contexts/planetsContext";
import { planetNames } from "./utils";

function App() {
  const { loading } = useContext(PlanetsContext);

  if (loading) return <Loader />;

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/mercury" />
        </Route>
        <Route path={`/:planetName(${planetNames.join("|")})`} exact children={<Planet />} />
        <Route path="/:param" children={<NotFound />} />
      </Switch>
    </Router>
  );
}

export default App;
