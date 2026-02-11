import { useReducer, useCallback, useMemo } from "react";
import { farmReducer, initialState } from "../reducers/farmReducer";

export const useFarmCalculators = () => {
  const [state, dispatch] = useReducer(farmReducer, initialState);


  const fertilizerCalculator = (crop, soilType, area) => {
    const fertReqs = {
      wheat: { N: 45, P: 22, K: 18 },
      rice: { N: 45, P: 18, K: 18 },
      maize: { N: 55, P: 28, K: 22 },
      cotton: { N: 65, P: 32, K: 35 },
      pulses: { N: 18, P: 12, K: 12 },
    };

    const soilAdj = {
      sandy: { N: 1.1, P: 1.2, K: 1.1 },
      loamy: { N: 1, P: 1, K: 1 },
      clay: { N: 0.9, P: 0.8, K: 0.9 },
      silt: { N: 1, P: 1.1, K: 1 },
    };

    if (!fertReqs[crop]) return "Crop not in database";

    const req = fertReqs[crop];
    const adj = soilAdj[soilType] || soilAdj.loamy;

    return {
      N: Math.round(req.N * area * adj.N),
      P: Math.round(req.P * area * adj.P),
      K: Math.round(req.K * area * adj.K),
    };
  };

  const seedCalculator = (crop, soilType, area) => {
    const seedReqs = {
      wheat: 45,
      rice: 30,
      maize: 9,
      cotton: 1.5,
      pulses: 10,
    };

    const soilAdj = { sandy: 1.1, loamy: 1, clay: 0.9, silt: 1 };

    if (!seedReqs[crop]) return "Crop not in database";

    return {
      seed: Math.round(seedReqs[crop] * area * (soilAdj[soilType] || 1)),
    };
  };

  const irrigationCalculator = (crop, soilType, area) => {
    const irrigationReqs = {
      wheat: 1700000,
      rice: 2800000,
      maize: 2200000,
      cotton: 2200000,
      pulses: 1200000,
    };

    const soilAdj = { sandy: 1.2, loamy: 1, clay: 0.8, silt: 1 };

    if (!irrigationReqs[crop]) return "Crop not in database";

    return {
      water: Math.round(
        irrigationReqs[crop] * area * (soilAdj[soilType] || 1)
      ),
    };
  };

  const calculators = useMemo(
    () => ({
      fertilizer: fertilizerCalculator,
      seed: seedCalculator,
      irrigation: irrigationCalculator,
    }),
    []
  );

  const updateField = useCallback((calculator, field, value) => {
    dispatch({ type: "UPDATE_FIELD", calculator, field, value });
  }, []);

  const calculate = useCallback(
    (calculator) => {
      const { cropType, area, soilType } =
        state[calculator].form;

      if (!cropType || !area || !soilType) {
        alert("Fill all fields");
        return;
      }

      const result = calculators[calculator](
        cropType,
        soilType,
        parseFloat(area)
      );

      dispatch({
        type: "SET_RESULT",
        calculator,
        payload: result,
      });
    },
    [state, calculators]
  );

  return { state, updateField, calculate };
};
