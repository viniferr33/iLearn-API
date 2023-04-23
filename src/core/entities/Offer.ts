import Entity from "./Entity";

type OfferProps = {
  title: string;
  description: string;
  status: boolean;
  price: number;
  category: string;
  studentId: number;
};

type OfferAcceptedProps = {
  studentId: number;
  offerId: number;
};

export default class Offer extends Entity<OfferProps> {
  private constructor(props: OfferProps) {
    super(props);
  }

  static create(
    props: OfferProps & {
      id?: number;
      createdAt?: Date;
      updatedAt?: Date;
    }
  ): Offer {
    const myEntity = new Offer(props);

    if (props.id) myEntity.id = props.id;
    if (props.createdAt) myEntity.createdAt = props.createdAt;
    if (props.updatedAt) myEntity.updatedAt = props.updatedAt;

    return myEntity;
  }
}

export { OfferProps };
