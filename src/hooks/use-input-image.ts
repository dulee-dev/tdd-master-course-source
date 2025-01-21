import { uploadImg } from '@/effects/image/image.effect';
import { ChangeEventHandler, useState } from 'react';

export const useInputImage = (initSrc: string, initUrl?: string) => {
  const [src, setSrc] = useState(initSrc);
  const [url, setUrl] = useState<string | undefined>(initUrl);

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
