import { uploadImg } from '@/effects/image/image.effect';
import { ChangeEventHandler, useState } from 'react';

export const useInputImage = (init: string) => {
  const [src, setSrc] = useState(init);
  const [url, setUrl] = useState<string | undefined>();

  const onChange: ChangeEventHandler<HTMLInputElement> = async (ev) => {
    if (ev.target.files === null) return;
    const file = ev.target.files[0];
    const url = await uploadImg(file);

    setSrc(url);
    setUrl(url);
  };

  return {
    src,
    url,
    onChange,
  };
};
