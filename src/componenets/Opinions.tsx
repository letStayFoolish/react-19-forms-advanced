import React, { use } from "react";
import { OpinionsContext, TOpinion } from "../store/OpinionContext.tsx";
import Opinion from "./Opinion.tsx";

const Opinions: React.FC = () => {
  const { opinions } = use(OpinionsContext);

  return (
    <div id="opinions">
      <h2>User Opinions</h2>
      {opinions && (
        <ul>
          {(opinions as TOpinion[])?.map((o) => (
            <li key={o.id}>
              <Opinion opinion={o} />
            </li>
          ))}
        </ul>
      )}
      {!opinions && (
        <p>No opinions found. Maybe share your opinion on something?</p>
      )}
    </div>
  );
};

export default Opinions;
