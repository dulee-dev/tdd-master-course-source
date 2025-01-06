'use client';

import { localizeDate } from '@/libs/sub-string';
import { layoutStyles } from '@/styles/layout-styles';
import { middleDot } from '@/utils/string';
import clsx from 'clsx';
import { InputImage } from '../input-image';
import { useContentEditable } from '@/hooks/use-content-editable';
import { useInputImage } from '@/hooks/use-input-image';

interface Props {
  className?: string;
}

export const ContentCreateForm = (props: Props) => {
  const { text: title, onInput: onInputTitle } = useContentEditable('');
  const { text: body, onInput: onInputBody } = useContentEditable('');
  const {
    src: thumbnailSrc,
    url: thumbnailUrl,
    onChange: onChangeThumbnail,
  } = useInputImage('/file.svg');

  return (
    <form className={clsx(layoutStyles.mx, props.className)}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="text-4xl font-bold leading-normal outline-none"
        onInput={onInputTitle}
      ></div>
      <div className="mb-8">
        <span>{'dulee'}</span>
        <span>{` ${middleDot} `}</span>
        <span>{localizeDate(new Date())}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        className="leading-snug outline-none min-h-48 pb-12 border-b-2 mb-12"
        onInput={onInputBody}
      ></div>
      <div className="flex justify-center mb-12">
        <InputImage src={thumbnailSrc} onChange={onChangeThumbnail} />
      </div>
      <div className="flex justify-center mb-20">
        <button
          className={
            'px-4 py-2 rounded font-bold bg-green-300 text-black disabled:bg-neutral-800 disabled:text-white'
          }
          disabled
        >
          생성하기
        </button>
      </div>
    </form>
  );
};
