import type { Protocol, ProtocolField } from "@/data";

type DescriptionBlockProps = {
  protocol: Protocol;
  field: ProtocolField | null;
};

const DescriptionBlock = ({ protocol, field }: DescriptionBlockProps) => {
  return (
    <div className="min-h-60 sm:min-h-48 w-3/4 sm:w-2/3 mt-8 p-4 sm:p-6 my-border-dashed-black">
      {field ? (
        <div>
          <p className="font-bold text-center">{field.name}</p>
          <p className="mt-2 text-sm text-center">{field.description}</p>
          {field.size && (
            <p className="mt-2 font-bold text-sm text-center tracking-widest">
              [{field.size}]
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-center">{protocol.description}</p>
      )}
    </div>
  );
};

export default DescriptionBlock;
