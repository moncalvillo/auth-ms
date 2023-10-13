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

export type IUserModel = Partial<{
  id: string;
  name: string;
  surname: string;
  nickname: string;
  password: string;
  email: string;
  profilePictureUrl: string;
}>;

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "users",
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
  public declare firstname?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare surname?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare email?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare nickname?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public declare password?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare profilePictureUrl?: string;

  @CreatedAt
  public declare createdAt: Date;

  @UpdatedAt
  public declare updatedAt: Date;

  @DeletedAt
  public declare deletedAt: Date;
}
