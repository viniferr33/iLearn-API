import Entity from "./Entity";

type StudentHelpRequestProps = {
  studentId: number;
  helpRequestId: number;
};

export class StudentHelpRequest extends Entity<StudentHelpRequestProps> {
  private constructor(props: StudentHelpRequestProps) {
    super(props);
  }

  static create(
    props: StudentHelpRequestProps & {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ): StudentHelpRequest {
    const myEntity = new StudentHelpRequest(props);

    if (props.id) myEntity.id = props.id;
    if (props.createdAt) myEntity.createdAt = props.createdAt;
    if (props.updatedAt) myEntity.updatedAt = props.updatedAt;

    return myEntity;
  }
}

export { StudentHelpRequestProps };
