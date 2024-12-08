import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

export type TOpinion = {
  id?: string;
  title: string;
  body: string;
  userName: string;
  votes?: number;
};

type OpinionsContextType = {
  opinions: TOpinion[] | null;
  addOpinion: (opinion: TOpinion) => void;
  upvoteOpinion: (id: string) => void;
  downvoteOpinion: (id: string) => void;
};

export const OpinionsContext = createContext<OpinionsContextType>({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

const OpinionsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [opinions, setOpinions] = useState<TOpinion[]>();

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion: TOpinion = await response.json();
    if (!savedOpinion) return;

    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id: string) {
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/upvote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) return;

    setOpinions((prevOpinions) => {
      return (prevOpinions as TOpinion[]).map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion?.votes + 1 };
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id: string) {
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/downvote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) return;

    setOpinions((prevOpinions) => {
      return prevOpinions?.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion?.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
};

export default OpinionsContextProvider;
