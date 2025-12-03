import {
  FRAMES,
  PROTOCOLS,
  type Protocol,
  type ProtocolField,
  type ProtocolFrame,
} from "@/data";

export const getProtocol = (id: string): Protocol => {
  const p = PROTOCOLS.find((p) => p.id === id);
  if (!p) throw new Error("Invalid protocol id");
  return p;
};

export const getRelatedFrames = (protocolId: string): ProtocolFrame[] => {
  return FRAMES.filter((f) => f.protocolId === protocolId);
};

export const getFrame = (frameId: string): ProtocolFrame => {
  const f = FRAMES.find((f) => f.frameId === frameId);
  if (!f) throw new Error("Invalid frame id");
  return f;
};

export const getField = (
  frame: ProtocolFrame,
  fieldId: string
): ProtocolField => {
  const f = frame.fields.find((f) => f.id === fieldId);
  if (!f) throw new Error("Invalid field id");
  return f;
};
