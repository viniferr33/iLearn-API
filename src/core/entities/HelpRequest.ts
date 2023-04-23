import Entity from "./Entity";

type HelpRequestProps = {
  title: string;
  description: string;
  status: boolean;
  category: string;
  studentId: number;
};

type HelpRequestEngagedProps = {
  studentId: number;
  helpRequestId: number;
};

export default class HelpRequest extends Entity<HelpRequestProps> {
  private constructor(props: HelpRequestProps) {
    super(props);
  }

  static create(
    props: HelpRequestProps & {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ): HelpRequest {
    const myEntity = new HelpRequest(props);

    if (props.id) myEntity.id = props.id;
    if (props.createdAt) myEntity.createdAt = props.createdAt;
    if (props.updatedAt) myEntity.updatedAt = props.updatedAt;

    return myEntity;
  }
}

export { HelpRequestProps };
