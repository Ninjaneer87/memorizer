import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';

type Props = {
  image: string;
  animationDelay: number;
  handleFlip: (id: number) => void;
  isOpen: boolean;
  isPaired: boolean;
  notMatching: boolean;
  index: number;
}
const Card = ({ image, notMatching, animationDelay, isOpen, handleFlip, isPaired, index }: Props) => {
  const flip = () => {
    !isOpen && handleFlip(index);
  }

  return (
    <button
      style={{ animationDelay: `${animationDelay}ms` }}
      className={`
        blur-in aspect-square border border-solid rounded-xl flex justify-center items-center p-1 sm:p-2  
        ${isOpen || isPaired ? 'border-primary' : 'border-secondary'}
        ${notMatching ? 'border-red-500 delay-500' : ''}
      `}
      onClick={flip}
    >
      <img src={image} alt="Card" className={`w-full h-full object-cover rounded-xl ${isOpen || isPaired ? 'blur-in' : 'hidden'} `} loading='eager' />
      <FontAwesomeIcon icon={solid('shapes')} className={`blur-in text-secondary text-3xl sm:text-6xl ${isOpen || isPaired ? 'hidden' : 'blur-in'}`} />
    </button>
  );
};

export default React.memo(Card);