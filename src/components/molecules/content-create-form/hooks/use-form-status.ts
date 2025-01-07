import {
  validateBody,
  validateTitle,
} from '@/domains/content/content-validation';
import { useEffect, useState } from 'react';

export const useFormStatus = ({
  title,
  body,
  thumbnailUrl,
}: {
  title: string;
  body: string;
  thumbnailUrl: string | undefined;
}) => {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const titleOk = validateTitle(title);
    const bodyOk = validateBody(body);
    const thumbnailOk = typeof thumbnailUrl === 'string';

    const next = [titleOk, bodyOk, thumbnailOk].every((c) => c === true);

    setStatus(next);
  }, [title, body, thumbnailUrl]);

  return status;
};
