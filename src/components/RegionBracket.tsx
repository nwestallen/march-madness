import React, { useEffect, useState } from "react";
import { Bracket, IRoundProps } from "react-brackets";
import { emptyRegionProps } from "../constants/mockData";
import CustomSeed from "./CustomSeed";

type RegionBracketProps = {
  rtl?: boolean;
  r1Teams?: any[];
  roundProps: IRoundProps[];
};

const RegionBracket = ({ rtl, roundProps }: RegionBracketProps) => {
  const [rounds, setRounds] = useState<IRoundProps[]>(emptyRegionProps);

  useEffect(() => {
    setRounds(roundProps);
  }, [roundProps]);

  return (
    <div className="flex-inline text-sm w-1/2 pb-4">
      <Bracket rounds={rounds} rtl={rtl} renderSeedComponent={CustomSeed} />
    </div>
  );
};

export default RegionBracket;
