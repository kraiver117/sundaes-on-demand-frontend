export type Phase = "inProgress" | "review" | "completed" | null | undefined;

export type SetOrderPhase = {
  setOrderPhase: (phase: Phase) => void;
};
