import React, { useEffect, useState } from "react";

export interface SectionDescription {
  content: string;
  source: string;
}

export interface Planet {
  name: string;
  overview: SectionDescription;
  structure: SectionDescription;
  geology: SectionDescription;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: {
    planet: string;
    internal: string;
    geology: string;
  };
}

interface PlanetsProps {
  planets: Planet[];
  loading: boolean;
}

const baseState: PlanetsProps = { planets: [], loading: true };

const PlanetsContext = React.createContext<PlanetsProps>(baseState);

export const PlanetsProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(baseState.loading);
  const [planets, setPlanets] = useState<Planet[]>(baseState.planets);

  useEffect(() => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setPlanets(json);
      })
      .then((_) => setLoading(false))
      .catch((e) => console.error(e));
  }, []);

  return <PlanetsContext.Provider value={{ planets, loading }}>{children}</PlanetsContext.Provider>;
};

export default PlanetsContext;
