
import { IResourceComponentsProps } from "@refinedev/core";

export interface IJudgingSession {
    competitionId: string,
    competitionName: string,
    classTypeId: string,
    classTypeName: string,
    classTestId: string
    classPhaseName: string
  };

/*export interface IClassTestView {
    phase_num: number,
    phase_name: string,
    competition_id: number,
    class_type_id: number,
    id: number,
    name: string,
    class_types_name: string,
    competition_name: string
  };*/

export interface IMovementList {
    class_test_id: number;
    movement_id: number;
    id: number; // item_num
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
  
export interface IJudgingScoringComponentProps extends IResourceComponentsProps {
  movement: IMovementList
  rider: IRider
  onScoreSaved: () => void
};

interface xIJudgingScoringComponentProps extends IJudgingComponentProps {
  onScoreSaved: (arg: IJudgingSession) => void
};
  