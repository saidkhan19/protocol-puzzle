export type GameDurationOption = {
  name: string;
  value: number;
};

export const DURATIONS: GameDurationOption[] = [
  { name: "5s", value: 5_000 },
  { name: "10s", value: 10_000 },
  { name: "20s", value: 20_000 },
];

export const INFINITY_VALUE = "infinity" as const;

export type GameDuration = number | typeof INFINITY_VALUE;
