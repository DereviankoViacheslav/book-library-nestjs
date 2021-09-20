import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema<any>) {}

  transform(incomeValue: any, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(incomeValue);
    this.getError(error);
    return value;
  }

  private getError(error: Joi.ValidationError | undefined) {
    if (error) {
      throw new BadRequestException({
        DETAILS: `${error.details[0].message}`,
        EN: 'Validation error',
      });
    }
  }
}
