import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Footer = (props: Props) => {
  return (
    <div className={clsx('bg-neutral-950 h-32 mt-auto', props.className)}></div>
  );
};
