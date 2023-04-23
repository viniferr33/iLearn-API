import Entity from "./Entity";

type StudentProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

type StudentHelpRequestProps = {
  studentId: number;
  helpRequestId: number;
};

type StudentOfferRequestProps = {
  studentId: number;
  offerId: number;
};

export default class Student extends Entity<StudentProps> {
  private constructor(props: StudentProps) {
    super(props);
  }

  static create(
    props: StudentProps & {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ): Student {
    const myEntity = new Student(props);

    if (props.id) myEntity.id = props.id;
    if (props.createdAt) myEntity.createdAt = props.createdAt;
    if (props.updatedAt) myEntity.updatedAt = props.updatedAt;

    return myEntity;
  }
}

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

export class StudentOffer extends Entity<StudentOfferRequestProps> {
  private constructor(props: StudentOfferRequestProps) {
    super(props);
  }

  static create(
    props: StudentOfferRequestProps & {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ): StudentOffer {
    const myEntity = new StudentOffer(props);

    if (props.id) myEntity.id = props.id;
    if (props.createdAt) myEntity.createdAt = props.createdAt;
    if (props.updatedAt) myEntity.updatedAt = props.updatedAt;

    return myEntity;
  }
}

export { StudentProps, StudentHelpRequestProps, StudentOfferRequestProps };
