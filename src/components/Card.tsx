import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import React from 'react';

type Props = {
  id: number;
  image: string;
  animationDelay: number;
  handleFlip: (id: number) => void;
  isOpen: boolean;
  isPaired: boolean;
  notMatching: boolean;
}
const Card = ({ image, notMatching, animationDelay, isOpen, handleFlip, isPaired, id }: Props) => {
  const flip = () => {
    !isOpen && handleFlip(id);
  }
  return (
    <button
      style={{ animationDelay: `${animationDelay}ms` }}
      className={`
        blur-in aspect-square border border-solid rounded-xl flex justify-center items-center 
        ${isOpen || isPaired ? 'border-primary' : 'border-secondary'} p-1 sm:p-2  
        ${notMatching ? 'border-red-500 delay-500' : ''}
      `}
      onClick={flip}
    >
      {
        isOpen || isPaired
          ? <img src={image} alt="Card" className={`w-full h-full object-cover rounded-xl blur-in`} />
          : <div className='blur-in flex justify-center items-center'>
              <FontAwesomeIcon icon={solid('shapes')} className='text-secondary text-3xl sm:text-6xl' />
            </div>
      }
    </button>
  );
};

export default React.memo(Card);