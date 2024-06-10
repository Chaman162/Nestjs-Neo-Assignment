import { IsAlpha, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class CreateProduct {
  @IsString()
  @Length(1, 1)
  code: string;
  name: string;
  abbr: string
}

export class ProductCodeParam {
  @IsNotEmpty()
  @IsAlpha()
  @Length(1, 1)
  code: string;
}

export class FindByCodeParams extends ProductCodeParam {}

export class FindStudiesParams extends ProductCodeParam {}

export class FindByNameParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;
}

export class FindByAbbrParams {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  abbr: string;
}

export class UpdateProduct {
  @IsString()
  @IsOptional()
  code: string;
  name: string;
  abbr: string
}

