import { ComponentProps } from 'react';
import { useSetPage } from '../hooks/usePage';
import { cn } from '../utils';

export const HomePage = () => {
  const setPage = useSetPage();

  return (
    <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <h1 className={cn('md:text-4xl text-xl text-white relative z-20')}>Welcome to Devvit</h1>
      <p className="text-center mt-2 mb-4 text-neutral-300 relative z-20">
        Let's build something awesome!
      </p>
      <MagicButton
        onClick={() => {
          setPage('pokemon');
        }}
      >
        Cool, but let's play Pokemon
      </MagicButton>
    </div>
  );
};

const MagicButton = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      className={cn(
        'relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50',
        props.className
      )}
      {...props}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {children}
      </span>
    </button>
  );
};
