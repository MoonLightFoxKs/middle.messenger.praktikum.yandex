import { Router } from './router.ts';

export type Indexed<T = any> = {
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (let k in rhs) {
    if (!rhs.hasOwnProperty(k)) {
      continue;
    }

    try {
      if (rhs[k].constructor === Object) {
        rhs[k] = merge(lhs[k] as Indexed, rhs[k] as Indexed);
      } else {
        lhs[k] = rhs[k];
      }
    } catch (e) {
      lhs[k] = rhs[k];
    }
  }

  return lhs;
}

export function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );
  return merge(object as Indexed, result);
}

export function isPlainObject(value: unknown): value is Indexed {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export function queryStringify(data: Record<string, any>) {
  return Object.entries(data).reduce(
    (acc, e, i) => `${acc}${i > 0 ? '&' : '?'}${e[0]}=${e[1]}`,
    '',
  );
}

export const errorHandling = (response: XMLHttpRequest) => {
  const router = new Router();
  if (response.status === 500) {
    router.go('/500');
  } else if (response.status !== 200) {
    throw new Error(response.response.reason);
  }
};
