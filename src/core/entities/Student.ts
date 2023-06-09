import Entity from "./Entity";

type StudentProps = {
  name: string;
  email: string;
  password: string;
  phone: string;
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

export { StudentProps };
