import { FormEventHandler, useState } from 'react';

export const useContentEditable = (init: string) => {
  const [text, setText] = useState(init);

  const onInput: FormEventHandler<HTMLDivElement> = (ev) => {
    const cur = ev.currentTarget.innerText;

    setText(cur);
  };

  return {
    text,
    onInput,
  };
};
