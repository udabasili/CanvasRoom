import { IoChevronForwardOutline } from 'react-icons/io5';

import { useGetGroups } from '@/features/group/api/get-groups.ts';

import {
  Arrow,
  GroupsContainer,
  Menu,
  MenuItem,
  ModalFooter,
  Text,
} from './group.styled.tsx';

type GroupsProps = {
  goBack: (e: 'add' | 'group' | null) => void;
};
export const Groups = ({ goBack }: GroupsProps) => {
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
      <Menu className="h-[30vh] overflow-y-auto">
        {groups?.map((group, index) => (
          <MenuItem key={index}>
            <Text>{group.name}</Text>
            <Arrow>
              <IoChevronForwardOutline size={20} color={'lightgrey'} />
            </Arrow>
          </MenuItem>
        ))}
      </Menu>

      <ModalFooter className="justify-between">
        <button className="btn" onClick={() => goBack(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="currentColor"
            className="back-button-icon"
          >
            <path
              d="M10 6L4 12L10 18"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 12H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back
        </button>
      </ModalFooter>
    </GroupsContainer>
  );
};
