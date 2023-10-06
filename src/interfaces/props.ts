
import { IResourceComponentsProps } from "@refinedev/core";

export interface IJudgingSession {
    competitionId: string,
    competitionName: string,
    classTypeId: string,
    classTypeName: string,
    classTestId: string
    classPhaseName: string
  };

export interface IMovementList {
    class_test_id: number;
    movement_id: number;
    item_num: number;
    is_collective: boolean;
    description: string;
    directive: string;
    coeffient: number;
    max_value: number;
    allowed_increments: number;
    name: string;
    score_range_id: number;
    total_movements: number;
  }

export interface IRider {
  riderTestId: number,
  riderDetails: string
};

export interface IJudgingComponentProps extends IResourceComponentsProps {
  judgingSession: IJudgingSession
  rider?: IRider
};
  
export interface IJudgingScoringComponentProps extends IJudgingComponentProps {
  movement: IMovementList
  onScoreSaved: () => void
};

interface xIJudgingScoringComponentProps extends IJudgingComponentProps {
  onScoreSaved: (arg: IJudgingSession) => void
};
  