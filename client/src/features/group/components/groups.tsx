import { IoChevronForwardOutline } from 'react-icons/io5';

import { useGetGroups } from '@/features/group/api/get-groups.ts';

import { Arrow, GroupsContainer, MenuItem, Text } from './group.styled.tsx';

export const Groups = () => {
	const { groups, isLoading, error } = useGetGroups();

	if (isLoading)
		return (
			<GroupsContainer className="content-center items-center justify-center ">
				<span className="loading loading-bars loading-lg text-success"></span>
			</GroupsContainer>
		);
	if (error) return <GroupsContainer>Error: {error.message}</GroupsContainer>;

	return (
		<GroupsContainer>
			{groups?.map((group, index) => (
				<MenuItem key={index}>
					<Text>{group.name}</Text>
					<Arrow>
						<IoChevronForwardOutline
							size={20}
							color={'lightgrey'}
						/>
					</Arrow>
				</MenuItem>
			))}
		</GroupsContainer>
	);
};
