import clsx from 'clsx';
import Image from 'next/image';

interface Props {
  className?: string;
}

export const InputImage = (props: Props) => {
  return (
    <div className={clsx(props.className)}>
      <label htmlFor="thumnail" className="cursor-pointer">
        <Image width={200} height={200} alt="thumbnail" src="/file.svg" />
      </label>
      <input type="file" accept="image/*" className="hidden" id="thumnail" />
    </div>
  );
};
