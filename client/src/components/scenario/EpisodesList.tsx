import React from "react";
import {
  ILexiconScenario,
  IRestriction,
  LexiconInfo,
} from "../../shared/interfaces";
import "./EpisodesList.scss";
import { useLexicon } from "../../hooks/useLexicon";

interface CombinedEpisode {
  isGroup: boolean;
  position: number;
  restriction?: IRestriction;
  description?: {
    content: string;
    foundLexicons: LexiconInfo[];
  };
  nonSequentialEpisodes?: {
    restriction: IRestriction;
    description: {
      content: string;
      foundLexicons: LexiconInfo[];
    };
  }[];
}

export const EpisodesList: React.FC<{ scenario: ILexiconScenario }> = ({
  scenario,
}) => {
  const { processContent } = useLexicon();

  const combined: CombinedEpisode[] = [
    ...scenario.episodes.map((episode) => ({ ...episode, isGroup: false })),
    ...scenario.groups.map((group) => ({
      position: group.position,
      nonSequentialEpisodes: group.nonSequentialEpisodes,
      isGroup: true,
    })),
  ];

  combined.sort((a, b) => a.position - b.position);

  return (
    <div className="episodes-list">
      <ol>
        {combined.map((item) => (
          <React.Fragment key={item.position}>
            {!item.isGroup
              ? item.description && <li>{processContent(item.description)}</li>
              : !!item.nonSequentialEpisodes?.length && (
                  <li>
                    <ul>
                      {item.nonSequentialEpisodes?.map((ep, index) => (
                        <li key={index}>{processContent(ep.description)}</li>
                      ))}
                    </ul>
                  </li>
                )}
          </React.Fragment>
        ))}
      </ol>
    </div>
  );
};
