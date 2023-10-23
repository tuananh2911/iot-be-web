import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class IotEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public temperature: number;
  @Column()
  public water: number;
  @Column()
  public humidity: number;
  @Column()
  public lux: number;
  @Column()
  public timestamp: string;
  @Column()
  public pumpSpeed: number;
  @Column()
  public fanSpeed: number;
  @Column()
  public isRain: boolean;
  @Column()
  public pumpIsActive: boolean;
  @Column()
  public fanIsActive: boolean;
  @Column()
  public lightIsActive: boolean;
}
