import { ReactNode, MouseEvent, useRef, useCallback } from 'react';
import { StyledDetails, StyledSummary, StyledParagraph } from './styles';

type Props = {
  summary: ReactNode;
  content: ReactNode;
};

type State = {
  animation?: Animation | null;
  isOpening?: boolean;
  isClosing?: boolean;
};

/* eslint-disable no-param-reassign */
export const DetailsItem = ({ summary, content }: Props) => {
  const state = useRef<State>({});
  const title = useRef<HTMLElement>(null);

  const open = useCallback(
    (target: HTMLDetailsElement) => {
      const startHeight = `${target.offsetHeight}px`;
      target.open = true;

      window.requestAnimationFrame(() => {
        state.current.isOpening = true;
        const endHeight = `${target.scrollHeight}px`;

        if (state.current.animation) {
          state.current.animation.cancel();
        }

        const animation = target.animate(
          {
            height: [startHeight, endHeight],
          },
          {
            duration: 250,
            easing: 'ease-out',
          },
        );

        state.current.animation = animation;

        animation.onfinish = () => {
          target.style.height = '';
          target.style.overflow = '';
          state.current.isOpening = false;
          state.current.animation = null;
        };

        animation.oncancel = () => {
          state.current.isOpening = false;
        };
      });
    },
    [state],
  );

  const close = useCallback(
    (target: HTMLDetailsElement) => {
      const startHeight = `${target.offsetHeight}px`;

      if (state.current.animation) {
        state.current.animation.cancel();
      }

      window.requestAnimationFrame(() => {
        state.current.isClosing = true;

        const endHeight = `${title.current?.offsetHeight ?? 0}px`;

        const animation = target.animate(
          {
            height: [startHeight, endHeight],
          },
          {
            duration: 250,
            easing: 'ease-out',
          },
        );

        state.current.animation = animation;

        animation.onfinish = () => {
          target.style.height = '';
          target.style.overflow = '';
          target.open = false;
          state.current.isClosing = false;
          state.current.animation = null;
        };

        animation.oncancel = () => {
          state.current.isClosing = false;
        };
      });
    },
    [state],
  );

  const toggle = useCallback(
    (e: MouseEvent<HTMLDetailsElement>) => {
      e.preventDefault();

      const target = e.currentTarget;

      target.style.overflow = 'hidden';

      if (state.current.isClosing || !target.open) {
        open(target);
      } else if (state.current.isOpening || target.open) {
        close(target);
      }
    },
    [state, open, close],
  );

  return (
    <StyledDetails onClick={toggle}>
      <StyledSummary ref={title}>{summary}</StyledSummary>
      <StyledParagraph>{content}</StyledParagraph>
    </StyledDetails>
  );
};
/* eslint-enable */
