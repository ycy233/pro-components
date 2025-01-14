import { useEffect } from 'react';
import isBrowser from '../../isBrowser';

function useDocumentTitle(
  titleInfo: {
    title: string;
    id: string;
    pageName: string;
  },
  appDefaultTitle: string,
) {
  const titleText = typeof titleInfo.pageName === 'string' ? titleInfo.title : appDefaultTitle;
  useEffect(() => {
    if (isBrowser() && titleText) {
      document.title = titleText;
    }
  }, [titleInfo.title]);
}

export default useDocumentTitle;
