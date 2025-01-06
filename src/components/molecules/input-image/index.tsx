import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEventHandler } from 'react';

interface Props {
  className?: string;
  src: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const InputImage = (props: Props) => {
  return (
    <div className={clsx(props.className)}>
      <label htmlFor="thumnail" className="cursor-pointer">
        <Image width={200} height={200} alt="thumbnail" src={props.src} />
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="thumnail"
        onChange={props.onChange}
      />
    </div>
  );
};
