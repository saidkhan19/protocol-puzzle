import { PROTOCOLS, type Protocol } from "@/data";

export const getProtocol = (id: string): Protocol => {
  const p = PROTOCOLS.find((p) => p.id === id);
  if (!p) throw new Error("Invalid protocol id");
  return p;
};
