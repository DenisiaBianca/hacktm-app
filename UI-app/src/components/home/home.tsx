import React from "react";
import Graphic from "../graph/graph";

const Home = () => {
  const gaz_data = [
    { day: new Date(2020, 5, 1), value: 10 },
    { day: new Date(2020, 5, 2), value: 13 },
    //{ data: new Date(2020, 5, 3), value: 6 },
    // { data: new Date(2020, 5, 4), value: 10 },
    // { data: new Date(2020, 5, 5), value: 1 },
    // { data: new Date(2020, 5, 6), value: 20 },
  ];
  const apa_data = [
    { day: new Date(2020, 5, 1), value: 9 },
    { day: new Date(2020, 5, 2), value: 3 },
    { day: new Date(2020, 5, 3), value: 16 },
    { day: new Date(2020, 5, 4), value: 10 },
    { day: new Date(2020, 5, 5), value: 7 },
    { day: new Date(2020, 5, 6), value: 11 },
  ];
  return (
    <div>
      <Graphic title={"gaz"} data={gaz_data} color={"rgba(220,20,60,0.5)"} />
      <Graphic title={"apa"} data={apa_data} color={"rgba(30,144,255,0.5)"} />
    </div>
  );
};

export default Home;
