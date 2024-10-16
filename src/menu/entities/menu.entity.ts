import { Column, Entity, ObjectIdColumn } from "typeorm";

@Entity()
export class Menu {
    @ObjectIdColumn()
  id: String;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;
}
