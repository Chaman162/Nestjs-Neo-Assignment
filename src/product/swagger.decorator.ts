import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

export function CustomSwaggerDecorator(options: {
  tags?: string[];
  security?: boolean;
  query?: { name: string; description: string; type: any }[];
  response?: { status: number; description: string; type: any }[];
}) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    if (options.tags) {
      ApiTags(...options.tags)(target, key, descriptor);
    }

    if (options.security) {
      ApiBearerAuth()(target, key, descriptor);
    }

    if (options.query) {
      options.query.forEach(q => {
        ApiQuery({ name: q.name, description: q.description, type: q.type })(target, key, descriptor);
      });
    }

    if (options.response) {
      options.response.forEach(r => {
        ApiResponse({ status: r.status, description: r.description, type: r.type })(target, key, descriptor);
      });
    }

    return descriptor;
  };
}