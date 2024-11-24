import { Helmet } from 'react-helmet-async';

type Head = {
	title: string;
	description?: string;
};
export const MainHead = (props: Head) => {
	const { title = '', description = 'Education App' } = props;
	return (
		<Helmet>
			<title>{`${title} - Edukator`}</title>
			<meta name="description" content={description} />
		</Helmet>
	);
};
