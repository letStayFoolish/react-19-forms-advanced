import React, { use, useActionState, useOptimistic } from "react";
import { OpinionsContext, type TOpinion } from "../store/OpinionContext.tsx";

type Props = {
  opinion: TOpinion;
};

const Opinion: React.FC<Props> = ({ opinion }) => {
  const { id, title, body, votes, userName } = opinion;
  const { upvoteOpinion, downvoteOpinion } = use(OpinionsContext);

  /**
   * ### React `useOptimistic` Hook
   * The `useOptimistic` hook is designed to manage optimistic UI updates.
   * It helps in anticipating the outcome of an operation typically involving server interaction,
   * but allows the UI to reflect the anticipated state without waiting for a server response.
   *
   * #### Parameters
   *
   * #### Parameters
   *
   * `useOptimistic` requires two arguments:
   *
   * 1. Initial State:
   *    This is the initial state that you want to optimistically update while an asynchronous operation is pending.
   *    It is the state on which the optimistic updates are based. In our example, this is initially set to the number of `votes`.
   * 2. Reducer Function:
   *    This function determines how the state should be updated optimistically. It receives two parameters:
   *     - Previous State: The previous state of the data you wish to optimistically update. This helps in deciding how the state should transition optimistically.
   *     - Parameter: This is the parameter that you pass when calling the setter function, like `setOptimisticVotes()`. In the given example, it's the mode ("up" or "down"), determining whether to increase or decrease the votes.
   *     After "prevVotes" we can have as many arguments as we passed to the setOptimisticVotes function
   */
  const [optimisticVotes, setOptimisticVotes] = useOptimistic(
    votes as number,
    (prevVotes: number, mode: "up" | "down") =>
      mode === "up" ? prevVotes + 1 : prevVotes - 1,
  );

  async function upvodeAction() {
    setOptimisticVotes("up");
    await upvoteOpinion(id as string);
  }

  async function downvodeAction() {
    setOptimisticVotes("down");
    await downvoteOpinion(id as string);
  }

  const [upvoteFormState, upvoteFormAction, upvoteFormPending] = useActionState(
    upvodeAction,
    null,
  );

  const [downvoteFormState, downvoteFormAction, downvoteFormPending] =
    useActionState(downvodeAction, null);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button
          formAction={upvoteFormAction}
          disabled={upvoteFormPending || downvoteFormPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticVotes}</span>

        <button
          formAction={downvoteFormAction}
          disabled={downvoteFormPending || upvoteFormPending}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
};

export default Opinion;
