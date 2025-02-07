import { ApiProperty } from '@nestjs/swagger';

export class ErrorCreateSupeResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: ['humilityScore must not be greater than 10'] })
  message: string[] | string;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

export class ErrorDeleteSupeResponseDto {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;
}

