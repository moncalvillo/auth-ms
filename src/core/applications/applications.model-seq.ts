import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Table,
} from "sequelize-typescript";

export type IApplicationModel = Partial<{
  id: string;
  name: string;
  url: string;
  domain: string;
  description: string;
  redirectUrl: string;
  ip: string;
}>;

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "applications",
})
export class Application extends Model<IApplicationModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare description?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare url?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare domain?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare redirectUrl?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public declare ip?: string;

  @CreatedAt
  public declare createdAt: Date;

  @UpdatedAt
  public declare updatedAt: Date;

  @DeletedAt
  public declare deletedAt: Date;
}

export type IApiKeyModel = Partial<{
  id: string;
  key: string;
  applicationId: string;
  isActive: boolean;
  createdAt: Date;
  expiryDate: Date;
}>;

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "api_keys",
})
export class ApiKey extends Model<IApiKeyModel> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
  })
  public declare id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public declare key: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public declare applicationId: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  public declare isActive: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  public declare expiryDate: Date;

  @CreatedAt
  public declare createdAt: Date;

  @UpdatedAt
  public declare updatedAt: Date;

  @DeletedAt
  public declare deletedAt: Date;
}
