import { Expose, Transform } from 'class-transformer';

export class ReportDetailsDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
