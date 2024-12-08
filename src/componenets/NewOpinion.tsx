import React, { use, useActionState } from "react";
import { OpinionsContext } from "../store/OpinionContext.tsx";

const NewOpinion: React.FC = () => {
  const { addOpinion } = use(OpinionsContext);

  const submitNewOpinionAction = async (
    prevState: { errors: null | string[] },
    formData: FormData,
  ) => {
    const name = formData.get("userName") as string;
    const title = formData.get("title") as string;
    const body = formData.get("body") as string;

    const errors: string[] = [];

    if (!name.trim() || name.length < 2) {
      errors.push("Name is required, and must be at least 2 characters long.");
    }

    if (!title || title.trim().length < 5) {
      errors.push("Title is required, and must be at least 5 characters long.");
    }

    if (!body || body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Body is required, and must be at least 10 characters long.");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          name,
          title,
          body,
        },
      };
    }

    // submit to the backend
    await addOpinion({
      body,
      userName: name,
      title,
    });
    return {
      errors: null,
      enteredValues: {
        name: "",
        title: "",
        body: "",
      },
    };
  };

  const [formState, formAction] = useActionState(submitNewOpinionAction, {
    errors: null,
    enteredValues: {
      name: "",
      title: "",
      body: "",
    },
  });

  console.log({ formState });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValues?.name}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValues?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors?.map((e) => (
              <li className="error" key={e}>
                {e}
              </li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
};

export default NewOpinion;
