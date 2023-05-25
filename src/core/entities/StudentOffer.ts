import Entity from "./Entity";

type StudentOfferRequestProps = {
  studentId: number;
  offerId: number;
};

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

export { StudentOfferRequestProps };
