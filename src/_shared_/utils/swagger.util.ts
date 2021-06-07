import { getSchemaPath } from '@nestjs/swagger';

export const getArraySchema = (model: string | any): any => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number' },
            message: { type: 'string' },
            data: {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(model) },
                },
              },
            },
          },
        },
      ],
    },
  };
};

export const getGenericResponseSchema = (model: string | any): any => {
  return {
    schema: {
      allOf: [
        {
          properties: {
            status: { type: 'number' },
            message: { type: 'string' },
            data: model ? { $ref: getSchemaPath(model) } : null,
          },
        },
      ],
    },
  };
};
