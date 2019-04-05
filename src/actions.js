export const actionTypes = {
  ADVANCE_GENERATION: "advance-generation",
};

const advanceGeneration = () => {
  return {
    type: actionTypes.ADVANCE_GENERATION,
  };
};

export default {
  advanceGeneration,
};
