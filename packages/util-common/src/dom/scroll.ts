export const getScrollBarWidth = () => {
  if (typeof window !== 'undefined') {
    // Create the measurement node
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'scrollbar-measure';
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    const scrollbarWidth =
      scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
  }
  return null;
};

export const getScrollTop = (): number => {
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = (document.compatMode || '') === 'CSS1Compat';
  if (supportPageOffset) return window.pageYOffset;

  return isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
};

export const hasWindow = () => typeof window !== 'undefined';

export const showBodyOverflow = () => {
  const scrollTop = localStorage.getItem('scrollTop');
  if (scrollTop) {
    localStorage.removeItem('scrollTop');
  }
  const header = document.querySelector('header')
  if (header) header.removeAttribute('style');
  document.body.removeAttribute('style');
  if(scrollTop) window.scrollTo(0, Number(scrollTop));
};

export const hideBodyOverflow = () => {
  const scrollBarWidth = getScrollBarWidth();

  const scrollTop = getScrollTop();
  localStorage.setItem('scrollTop', scrollTop.toString());
  document.body.style.bottom = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.top = `-${scrollTop}px`;

  if (scrollBarWidth) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    const header  = document.querySelector('header')
    if(header)
      header.style["paddingRight"] =
        `${scrollBarWidth}px`;
  }
};

export const bodyScrollLock = (active: boolean) => {
  if (active) {
    if (document.body.style.overflow !== 'hidden')
      document.body.style.overflow = 'hidden';
  } else if (document.body.style.overflow === 'hidden')
    document.body.style.removeProperty('overflow');
};

export const isBodyScrollableY = () => {
  if (document) {
    const body = document.getElementsByTagName('body')[0] || {};
    return (body.style || {}).overflowY !== 'hidden';
  }
  return false;
};
