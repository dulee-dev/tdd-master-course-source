import { ChangeEventHandler, useState } from 'react';

export const useInputText = (init: string) => {
  const [text, setText] = useState(init);

  const onChange: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setText(ev.target.value);
  };

  return {
    text,
    onChange,
  };
};
