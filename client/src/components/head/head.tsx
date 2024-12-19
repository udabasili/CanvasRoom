import { Helmet } from 'react-helmet-async';

type Head = {
  title: string;
  description?: string;
};
export const MainHead = (props: Head) => {
  const { title = '', description = 'Canvas Room' } = props;
  return (
    <Helmet>
      <title>{`${title} - CanvasRoom`}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
