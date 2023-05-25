import { HelpRequestProps } from "./HelpRequest";
import { OfferProps } from "./Offer";
import { StudentProps } from "./Student";
import { StudentHelpRequestProps } from "./StudentHelpRequest";
import { StudentOfferRequestProps } from "./StudentOffer";

type EntityProps =
  | HelpRequestProps
  | OfferProps
  | StudentProps
  | StudentHelpRequestProps
  | StudentOfferRequestProps;

type EntityObject<T extends EntityProps> = T & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export default abstract class Entity<T extends EntityProps> {
  protected _id!: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  public props: T;

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  private filterObject(obj: T): T {
    const propsCopy = JSON.parse(JSON.stringify(obj));
    if (propsCopy.id) delete propsCopy.id;

    if (propsCopy.createdAt) delete propsCopy.createdAt;

    if (propsCopy.updatedAt) delete propsCopy.updatedAt;

    return propsCopy;
  }

  constructor(props: T) {
    this.props = this.filterObject(props);
  }

  public toObject(): EntityObject<T> {
    const obj = {
      ...this.props,
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
    return obj as EntityObject<T>;
  }
}

export { EntityProps, EntityObject };
