import { useEffect } from "react";
import DataScientistHero from "@/components/hero/DataScientistHero";

const Index = () => {
  useEffect(() => {
    document.title = "Ayoub EL YANBOIY - Data Engineer";
  }, []);

  return <DataScientistHero />;
};

export default Index;
