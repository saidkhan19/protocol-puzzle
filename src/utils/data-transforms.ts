import { FRAMES, PROTOCOLS, type Protocol, type ProtocolFrame } from "@/data";

export const getProtocol = (id: string): Protocol => {
  const p = PROTOCOLS.find((p) => p.id === id);
  if (!p) throw new Error("Invalid protocol id");
  return p;
};

export const getRelatedFrames = (protocolId: string): ProtocolFrame[] => {
  return FRAMES.filter((f) => f.protocolId === protocolId);
};
