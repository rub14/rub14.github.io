
import { IResourceComponentsProps } from "@refinedev/core";

export interface IJudgingSession {
    competitionId: number,
    competitionName: string,
    classTypeId: number,
    classTypeName: string,
    classTestId: number
    classPhaseName: string
  };

export interface IRider {
  riderTestId: number,
  riderDetails: string
};

export interface IJudgingComponentProps extends IResourceComponentsProps {
  judgingSession: IJudgingSession
  rider?: IRider
};
  
interface IxJudgingComponentProps extends IResourceComponentsProps {
  judgingSession?: IJudgingSession,
  setJudgingSession: (arg: IJudgingSession) => void
  setActiveRider: (arg: IRider) => void
};
  