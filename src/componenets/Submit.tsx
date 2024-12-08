import React from "react";
import { useFormStatus } from "react-dom";

const Submit: React.FC = () => {
  const { pending } = useFormStatus();
  return (
    <p className="actions">
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
};

export default Submit;
