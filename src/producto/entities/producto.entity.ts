import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'text' })
  nombre: string;
  @Column()
  precio: number;
}
