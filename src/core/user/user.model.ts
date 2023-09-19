import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

export interface IUserModel {
  id: string;
  name?: string | null;
  surname?: string | null;
  nickname?: string | null;
  password: string | null;
  email?: string | null;
  profilePictureUrl?: string | null;
}

@Table({
  timestamps: true,
  paranoid: true,
})
export class User extends Model<IUserModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public declare id: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare name?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare surname?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare email?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare nickname?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public declare password: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare profilePictureUrl?: string;

  @CreatedAt
  public declare createdAt: Date;

  @UpdatedAt
  public declare updatedAt: Date;

  @DeletedAt
  public declare deletedAt: Date;
}
